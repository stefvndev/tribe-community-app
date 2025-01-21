import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { EmojiClickData } from "emoji-picker-react";
import { TMessage } from "@/types/types";
import { pb } from "@/api/pocketbase";
import {
  useGetConversationMessages,
  useSelectedConversationData,
} from "@/api/get";
import { IconX } from "@tabler/icons-react";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import { cn } from "@/lib/utils";
import EmojiButton from "@/components/buttons/EmojiButton";

const SelectedConversation = () => {
  const navigate = useNavigate({ from: "/$id" });
  const { chat } = useSearch({ strict: false });
  const userId = pb.authStore.record?.id;
  const { data: messagesData, queryClient } = useGetConversationMessages(
    chat as string
  );
  const { data: conversationData } = useSelectedConversationData(
    chat as string
  );
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationUserData = useMemo(() => {
    return conversationData?.expand?.users?.filter(
      (user) => user?.id !== userId
    )[0];
  }, [conversationData, userId]);

  const handleCloseConversation = () => {
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.chat;
        return newSearch;
      },
    });
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setMessageInput((prev) => prev + emoji);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      const newMessage: TMessage = {
        message: messageInput,
        sender_id: userId as string,
        conversation: chat as string,
        reciever_id: conversationUserData?.id as string,
      };

      await pb.collection("messages").create(newMessage);
      setMessageInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const subscribeToMessages = async () => {
      const unsubscribe = await pb
        .collection("messages")
        .subscribe("*", (e) => {
          if (e.action === "create" && e.record.conversation === chat) {
            queryClient.invalidateQueries([
              "messages",
              chat,
            ] as InvalidateQueryFilters);
          }
        });

      return unsubscribe;
    };

    const unsubscribePromise = subscribeToMessages();

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, [chat, queryClient]);

  useEffect(() => {
    if (chat) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [chat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messagesData]);

  return (
    <div
      onClick={handleCloseConversation}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-screen bg-dark-primary/80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full h-full flex flex-col max-sm:max-w-full max-sm:max-h-full max-sm:rounded-none max-h-[80dvh] max-w-[90dvh] rounded-xl overflow-hidden"
      >
        <div className="w-full h-[68px] border-b flex items-center justify-between p-4 gap-2">
          <div className="flex items-center gap-4">
            <AvatarIcon
              avatar={conversationUserData?.avatar as string}
              name={conversationUserData?.name as string}
              id={conversationUserData?.id as string}
              collectionName={conversationUserData?.collectionName as string}
              className="rounded-full size-11 min-w-11 min-h-11"
            />
            <div className="flex flex-col items-start">
              <p className="font-medium text-dark-primary">
                {conversationUserData?.name}
              </p>
              <p className="text-sm text-grayout">
                {conversationUserData?.description || "No description yet."}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={handleCloseConversation} type="button">
              <IconX size={22} />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col w-full h-full max-h-[60dvh] max-sm:max-h-[80dvh] gap-4 overflow-y-auto py-6 px-4">
            {messagesData?.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <AvatarIcon
                  avatar={message?.expand?.sender_id?.avatar as string}
                  name={message?.expand?.sender_id?.name as string}
                  id={message?.expand?.sender_id?.id as string}
                  collectionName={
                    message?.expand?.sender_id?.collectionName as string
                  }
                  className="rounded-full size-11 min-w-11 min-h-11"
                />
                <div
                  className={cn(
                    "flex flex-col items-start gap-1 border w-full rounded-xl px-3 py-2",
                    message?.sender_id === userId ? "bg-primary" : "bg-white"
                  )}
                >
                  <p className="text-sm font-medium text-dark-primary">
                    {message?.expand?.sender_id?.name}
                  </p>
                  <p>{message?.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex self-end items-center w-full h-[70px] border-t px-2 py-1 relative overflow-hidden">
            <input
              value={messageInput}
              onChange={handleMessageInput}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder={`Message ${conversationUserData?.name}`}
              className="w-full h-full px-4 py-2 border-none outline-none"
            />
            <EmojiButton handleEmojiClick={handleEmojiClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedConversation;
