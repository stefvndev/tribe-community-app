import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { InvalidateQueryFilters } from "@tanstack/react-query";
import { EmojiClickData } from "emoji-picker-react";
import {
  useGetConversationMessages,
  useSelectedConversationData,
} from "@/api/get";
import { pb } from "@/api/pocketbase";
import EmojiButton from "@/components/buttons/EmojiButton";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import AppLayout from "@/components/layout/AppLayout";
import ChatLayout from "@/components/layout/ChatLayout";
import useUserStore from "@/store/UserStore";

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

  return (
    <main className="relative flex flex-col h-full overflow-hidden bg-white border rounded-lg shadow">
      <ChatHeader conversationUserData={conversationUserData} />

      <ChatMessages messagesData={messagesData} />

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
