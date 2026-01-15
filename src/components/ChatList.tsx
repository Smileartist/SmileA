import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MessageCircle, Send, X, Heart, ArrowLeft } from "lucide-react";
import { useTheme } from "../utils/ThemeContext";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: number;
}

interface SavedChat {
  id: string;
  friendId: string;
  messages: Message[];
  lastMessageTime: number;
  preview: string;
}

export function ChatList() {
  const { theme } = useTheme();
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<SavedChat | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [userId] = useState(() => {
    const savedUser = localStorage.getItem("smileArtist_user");
    if (savedUser) {
      return JSON.parse(savedUser).userId;
    }
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  useEffect(() => {
    loadSavedChats();
  }, [userId]);

  const loadSavedChats = () => {
    try {
      const chats = JSON.parse(localStorage.getItem(`buddy_saved_chats_${userId}`) || "[]");
      setSavedChats(chats);
    } catch (error) {
      console.error("Error loading saved chats:", error);
      setSavedChats([]);
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random()}`,
      text: inputMessage,
      sender: "me",
      timestamp: Date.now(),
    };

    // Update selected chat with new message
    const updatedMessages = [...selectedChat.messages, newMessage];
    const updatedChat = {
      ...selectedChat,
      messages: updatedMessages,
      lastMessageTime: Date.now(),
      preview: inputMessage,
    };

    // Update in localStorage
    const allChats = JSON.parse(localStorage.getItem(`buddy_saved_chats_${userId}`) || "[]");
    const chatIndex = allChats.findIndex((c: SavedChat) => c.id === selectedChat.id);
    if (chatIndex !== -1) {
      allChats[chatIndex] = updatedChat;
      localStorage.setItem(`buddy_saved_chats_${userId}`, JSON.stringify(allChats));
    }

    // Update local state
    setSelectedChat(updatedChat);
    setSavedChats(allChats);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "It's good to hear from you again!",
        "I'm glad you're reaching out. How have you been?",
        "Thanks for sharing that with me.",
        "I'm here if you need to talk more.",
        "That sounds interesting. Tell me more.",
      ];

      const botResponse: Message = {
        id: `msg_${Date.now()}_bot`,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "other",
        timestamp: Date.now(),
      };

      const newMessages = [...updatedMessages, botResponse];
      const chatWithBotResponse = {
        ...updatedChat,
        messages: newMessages,
        lastMessageTime: Date.now(),
        preview: botResponse.text,
      };

      // Update in localStorage
      const updatedAllChats = JSON.parse(localStorage.getItem(`buddy_saved_chats_${userId}`) || "[]");
      const idx = updatedAllChats.findIndex((c: SavedChat) => c.id === selectedChat.id);
      if (idx !== -1) {
        updatedAllChats[idx] = chatWithBotResponse;
        localStorage.setItem(`buddy_saved_chats_${userId}`, JSON.stringify(updatedAllChats));
      }

      setSelectedChat(chatWithBotResponse);
      setSavedChats(updatedAllChats);
    }, 1500);
  };

  if (selectedChat) {
    return (
      <div className="max-w-4xl mx-auto md:pt-0 -mt-16 md:mt-0 -mx-4 md:mx-auto h-screen md:h-auto">
        <Card className="border border-[#d4756f]/20 bg-white/80 backdrop-blur-sm md:rounded-2xl shadow-lg overflow-hidden h-full md:h-auto flex flex-col">
          <div className="border-b border-[#d4756f]/20 p-3 md:p-4 flex items-center justify-between bg-gradient-to-r from-[#fce4da]/30 to-[#f5e8e0]/30 flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <Button
                onClick={() => setSelectedChat(null)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10 hover:bg-[#fce4da] text-[#d4756f]"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#a8c9a3] rounded-full"></div>
              <div>
                <h3 className="text-[#2d2424] text-sm md:text-base">Your Support Buddy</h3>
                <p className="text-xs md:text-sm text-[#8a7c74]">Saved conversation</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4 bg-gradient-to-b from-white/50 to-[#fef9f5]/30">
            {selectedChat.messages.map((message) => {
              const isMe = message.sender === "me";
              const bubbleRadius = theme.chatBubbleStyle === "square" 
                ? "0.25rem" 
                : theme.chatBubbleStyle === "bubble" 
                  ? "1.5rem" 
                  : theme.borderRadius;
              
              const bubbleClass = theme.chatBubbleStyle === "bubble"
                ? (isMe ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm")
                : "";

              return (
                <div
                  key={message.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] md:max-w-[70%] px-3 py-2 md:px-4 md:py-3 shadow-sm ${bubbleClass}`}
                    style={{
                      backgroundColor: isMe ? theme.chatMyMessageBg : theme.chatOtherMessageBg,
                      color: isMe ? "white" : theme.textColor,
                      borderRadius: theme.chatBubbleStyle === "bubble" ? undefined : bubbleRadius,
                      border: !isMe ? `1px solid ${theme.primaryColor}20` : "none",
                    }}
                  >
                    <p className="whitespace-pre-wrap text-sm md:text-base">{message.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#d4756f]/20 p-3 md:p-4 bg-gradient-to-r from-[#fce4da]/30 to-[#f5e8e0]/30 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 text-sm md:text-base border-[#d4756f]/20 bg-white/80 rounded-xl focus:border-[#d4756f]"
              />
              <Button
                onClick={sendMessage}
                className="bg-gradient-to-r from-[#d4756f] to-[#c9a28f] hover:from-[#c9675f] hover:to-[#b89280] h-9 w-9 md:h-10 md:w-10 rounded-xl shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] md:text-xs text-[#8a7c74] mt-2">
              Continue your supportive conversation
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h2 className="text-[#2d2424] mb-2">My Saved Chats</h2>
        <p className="text-[#8a7c74] text-sm md:text-base">
          Continue conversations with your support buddies
        </p>
      </div>

      {savedChats.length === 0 ? (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-[#d4756f]/20 rounded-2xl">
          <Heart className="w-12 h-12 text-[#d4756f]/30 mx-auto mb-4" />
          <h3 className="text-[#2d2424] mb-2">No saved chats yet</h3>
          <p className="text-[#8a7c74] text-sm md:text-base">
            When you connect with someone through Talking Buddy and both agree to stay connected,
            your conversation will appear here.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {savedChats.map((chat) => (
            <Card
              key={chat.id}
              className="p-4 md:p-6 border-2 border-[#d4756f]/20 hover:border-[#d4756f]/40 transition-all bg-white/80 backdrop-blur-sm rounded-2xl cursor-pointer hover:shadow-md"
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#a8c9a3]/20 to-[#8fb5c9]/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#6b9865]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[#2d2424]">Support Buddy</h3>
                    <span className="text-xs text-[#8a7c74]">
                      {new Date(chat.lastMessageTime).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#8a7c74] truncate">{chat.preview}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-[#a8c9a3]">
                      {chat.messages.length} messages
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}