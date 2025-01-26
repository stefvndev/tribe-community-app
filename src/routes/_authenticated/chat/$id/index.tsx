import { useEffect, useMemo, useRef, useState } from "react";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useGetConversationMessages,
  useSelectedConversationData,
} from "@/api/get";
import { pb } from "@/api/pocketbase";
import AvatarIcon from "@/components/avatar/AvatarIcon";
import EmojiButton from "@/components/buttons/EmojiButton";
import AppLayout from "@/components/layout/AppLayout";
import ChatLayout from "@/components/layout/ChatLayout";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/UserStore";
import { EmojiClickData } from "emoji-picker-react";

export const Route = createFileRoute("/_authenticated/chat/$id/")({
  component: () => (
    <AppLayout>
      <ChatLayout>
        <RouteComponent />
      </ChatLayout>
    </AppLayout>
  ),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { userId } = useUserStore();
  const { data: conversationData } = useSelectedConversationData(
    id as string,
    userId as string
  );
  const {
    data: messagesData,
    queryClient,
    refetch,
  } = useGetConversationMessages(id as string);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState("");

  const conversationUserData = useMemo(() => {
    return conversationData?.expand?.users?.filter(
      (user) => user?.id !== userId
    )[0];
  }, [conversationData, userId]);

  const handleMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setMessageInput((prev) => prev + emoji);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !id) return;

    try {
      const newMessage = await pb.collection("messages").create({
        message: messageInput,
        sender_id: userId as string,
        conversation: id as string,
        receiver_id: conversationUserData?.id as string,
      });

      await pb.collection("conversations").update(id as string, {
        messages: [...(conversationData?.messages || []), newMessage.id],
        seen: false,
      });

      setMessageInput("");
      queryClient.invalidateQueries([
        "conversations",
      ] as InvalidateQueryFilters);
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
          if (e.action === "create" && e.record.conversation === id) {
            refetch();
          }
        });

      return unsubscribe;
    };

    const unsubscribePromise = subscribeToMessages();

    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, [id, queryClient, refetch]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (messagesData) {
        const unreadMessages = messagesData.filter(
          (message) => message.receiver_id === userId && !message.seen
        );

        if (unreadMessages.length > 0) {
          const updatePromises = unreadMessages.map((message) =>
            pb
              .collection("messages")
              .update(message.id as string, { seen: true })
          );

          await Promise.all(updatePromises);
          queryClient.invalidateQueries([
            "all_conversations",
          ] as InvalidateQueryFilters);

          refetch();
        }
      }
    };

    markMessagesAsRead();
  }, [id, messagesData, queryClient, refetch, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messagesData]);

  return (
    <main className="relative flex flex-col h-full overflow-hidden bg-white border rounded-lg shadow">
      <div className="relative flex items-center justify-between w-full gap-2 p-4 border-b">
        <div className="flex items-center gap-4">
          <AvatarIcon
            avatar={conversationUserData?.avatar as string}
            name={conversationUserData?.name as string}
            id={conversationUserData?.id as string}
            collectionName={conversationUserData?.collectionName as string}
            className="rounded-full size-11 min-w-11 min-h-11"
          />
          <div className="flex flex-col items-start">
            <Link
              to={`/profile/${conversationUserData?.id}`}
              className="font-medium text-dark-primary hover:underline"
            >
              {conversationUserData?.name}
            </Link>
            <p className="text-sm text-grayout">
              {conversationUserData?.description || "No description yet."}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-4 px-4 pt-6 overflow-y-auto max-h-[80%]">
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
              <Link
                to={`/profile/${message?.sender_id}`}
                className="text-sm font-medium text-dark-primary hover:underline"
              >
                {message?.expand?.sender_id?.name}
              </Link>
              <p>{message?.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bottom-0 flex items-center self-end w-full h-20 px-2 py-1 bg-white border-t">
        <input
          value={messageInput}
          onChange={handleMessageInput}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder={`Message ${conversationUserData?.name}`}
          className="w-full h-full px-4 py-2 border-none outline-none"
        />
        <EmojiButton
          handleEmojiClick={handleEmojiClick}
          className="-left-[320px]"
        />
      </div>
    </main>
  );
}
