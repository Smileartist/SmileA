import { useState } from "react";
import { Heart, MessageCircle, UserPlus, AtSign, Award, CheckCheck, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "buddy_request" | "buddy_accepted" | "milestone";
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content?: string;
  postTitle?: string;
  timestamp: string;
  isRead: boolean;
}

export function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "buddy_request",
      user: {
        name: "Alex Thompson",
        username: "alexthompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      },
      content: "Hi, I'm going through a tough time and would really appreciate someone to talk to. Your poetry has been such a comfort.",
      timestamp: "5m ago",
      isRead: false,
    },
    {
      id: "2",
      type: "like",
      user: {
        name: "Emily Rivers",
        username: "emilyrivers",
        avatar: "https://images.unsplash.com/photo-1624537046903-1e4acee0487f?w=100&h=100&fit=crop",
      },
      postTitle: "The Writer's Desk",
      timestamp: "1h ago",
      isRead: false,
    },
    {
      id: "3",
      type: "comment",
      user: {
        name: "Marcus Vale",
        username: "marcusvale",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "This touched my soul. Your words have a way of healing...",
      postTitle: "Morning Rituals",
      timestamp: "2h ago",
      isRead: false,
    },
    {
      id: "4",
      type: "follow",
      user: {
        name: "Sarah Chen",
        username: "sarahwrites",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      timestamp: "3h ago",
      isRead: true,
    },
    {
      id: "5",
      type: "mention",
      user: {
        name: "James Winters",
        username: "jwinters",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      content: "mentioned you in a post: \"Inspired by @lunapoet's beautiful verse on healing...\"",
      timestamp: "5h ago",
      isRead: true,
    },
    {
      id: "6",
      type: "buddy_accepted",
      user: {
        name: "Maya Patel",
        username: "mayapatel",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      },
      content: "accepted your support offer. You can now start chatting.",
      timestamp: "1d ago",
      isRead: true,
    },
    {
      id: "7",
      type: "milestone",
      user: {
        name: "Smile Artist",
        username: "smileartist",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
      },
      content: "Congratulations! Your poem 'The Writer's Desk' reached 500 likes! 🎉",
      timestamp: "2d ago",
      isRead: true,
    },
    {
      id: "8",
      type: "like",
      user: {
        name: "David Kim",
        username: "davidkim",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      postTitle: "moonlight whispers",
      timestamp: "2d ago",
      isRead: true,
    },
    {
      id: "9",
      type: "comment",
      user: {
        name: "Olivia Martinez",
        username: "oliviapoet",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
      },
      content: "Beautiful haiku! The imagery is stunning.",
      postTitle: "moonlight whispers",
      timestamp: "3d ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return Heart;
      case "comment":
        return MessageCircle;
      case "follow":
        return UserPlus;
      case "mention":
        return AtSign;
      case "buddy_request":
      case "buddy_accepted":
        return Award;
      case "milestone":
        return Sparkles;
      default:
        return Heart;
    }
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <strong>{notification.user.name}</strong> liked your post
            {notification.postTitle && <span className="opacity-70"> "{notification.postTitle}"</span>}
          </>
        );
      case "comment":
        return (
          <>
            <strong>{notification.user.name}</strong> commented on
            {notification.postTitle && <span className="opacity-70"> "{notification.postTitle}"</span>}
          </>
        );
      case "follow":
        return (
          <>
            <strong>{notification.user.name}</strong> started following you
          </>
        );
      case "mention":
        return (
          <>
            <strong>{notification.user.name}</strong> {notification.content}
          </>
        );
      case "buddy_request":
        return (
          <>
            <strong>{notification.user.name}</strong> sent you a Talking Buddy request
          </>
        );
      case "buddy_accepted":
        return (
          <>
            <strong>{notification.user.name}</strong> {notification.content}
          </>
        );
      case "milestone":
        return notification.content;
      default:
        return notification.content;
    }
  };

  const handleBuddyRequest = (notificationId: string, accept: boolean) => {
    // Handle buddy request acceptance/rejection
    markAsRead(notificationId);
    // In a real app, this would make an API call
  };

  const filterNotifications = (filter: string) => {
    if (filter === "all") return notifications;
    if (filter === "mentions") return notifications.filter(n => n.type === "mention");
    if (filter === "buddy") return notifications.filter(n => 
      n.type === "buddy_request" || n.type === "buddy_accepted"
    );
    return notifications;
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => {
    const Icon = getNotificationIcon(notification.type);
    
    return (
      <div
        onClick={() => markAsRead(notification.id)}
        className="flex gap-4 p-4 rounded-2xl transition-all cursor-pointer hover:shadow-md"
        style={{
          backgroundColor: notification.isRead ? 'transparent' : 'var(--theme-accent)',
          border: `1px solid ${notification.isRead ? 'var(--theme-primary)22' : 'var(--theme-primary)44'}`,
        }}
      >
        {/* Avatar */}
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
          <AvatarFallback>{notification.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--theme-primary)22' }}
            >
              <Icon className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: 'var(--theme-text)' }}>
                {getNotificationText(notification)}
              </p>
              {notification.type === "comment" && notification.content && (
                <p 
                  className="text-sm mt-1 italic"
                  style={{ color: 'var(--theme-text)', opacity: 0.7 }}
                >
                  "{notification.content}"
                </p>
              )}
              {notification.type === "buddy_request" && notification.content && (
                <p 
                  className="text-sm mt-2 p-3 rounded-xl"
                  style={{ 
                    backgroundColor: 'var(--theme-card-bg)',
                    color: 'var(--theme-text)',
                    opacity: 0.9,
                  }}
                >
                  "{notification.content}"
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.5 }}>
              {notification.timestamp}
            </span>

            {/* Action buttons for buddy requests */}
            {notification.type === "buddy_request" && !notification.isRead && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuddyRequest(notification.id, true);
                  }}
                  className="rounded-lg text-white"
                  style={{
                    background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
                  }}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuddyRequest(notification.id, false);
                  }}
                  className="rounded-lg"
                  style={{
                    borderColor: 'var(--theme-primary)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Unread indicator */}
        {!notification.isRead && (
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 style={{ color: 'var(--theme-text)' }}>Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm mt-1" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="rounded-xl"
              style={{
                borderColor: 'var(--theme-primary)',
                color: 'var(--theme-primary)',
              }}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList 
          className="grid w-full grid-cols-3 mb-6 rounded-xl shadow-md"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        >
          <TabsTrigger value="all" className="rounded-xl">
            All
            {unreadCount > 0 && (
              <Badge 
                className="ml-2 px-2 py-0.5"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white',
                }}
              >
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="mentions" className="rounded-xl">
            Mentions
          </TabsTrigger>
          <TabsTrigger value="buddy" className="rounded-xl">
            Talking Buddy
            {notifications.filter(n => 
              (n.type === "buddy_request" || n.type === "buddy_accepted") && !n.isRead
            ).length > 0 && (
              <Badge 
                className="ml-2 px-2 py-0.5"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white',
                }}
              >
                {notifications.filter(n => 
                  (n.type === "buddy_request" || n.type === "buddy_accepted") && !n.isRead
                ).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* All Notifications */}
        <TabsContent value="all" className="space-y-3">
          {filterNotifications("all").length > 0 ? (
            filterNotifications("all").map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                <CheckCheck className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
              </div>
              <p style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                You're all caught up! No new notifications.
              </p>
            </div>
          )}
        </TabsContent>

        {/* Mentions */}
        <TabsContent value="mentions" className="space-y-3">
          {filterNotifications("mentions").length > 0 ? (
            filterNotifications("mentions").map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                <AtSign className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
              </div>
              <p style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                No mentions yet
              </p>
            </div>
          )}
        </TabsContent>

        {/* Talking Buddy */}
        <TabsContent value="buddy" className="space-y-3">
          {filterNotifications("buddy").length > 0 ? (
            filterNotifications("buddy").map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                <Award className="w-8 h-8" style={{ color: 'var(--theme-primary)' }} />
              </div>
              <p style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                No Talking Buddy notifications
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}