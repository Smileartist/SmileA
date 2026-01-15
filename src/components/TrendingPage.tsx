import { useState } from "react";
import { TrendingUp, Flame, Clock, Calendar, Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { PostCard } from "./PostCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function TrendingPage() {
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month" | "all">("today");

  const trendingPosts = [
    {
      author: {
        name: "Sarah Chen",
        username: "sarahwrites",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      },
      title: "First Love",
      content: `Your smile, a sunrise in my darkest night,
Your touch, a melody I've never known,
In your eyes, I found my guiding light,
With you, I've never felt alone.

The world fades when you're near,
Every moment feels brand new,
In your arms, I have no fear,
My heart belongs to you.`,
      likes: 1892,
      comments: 267,
      timestamp: "3h ago",
      category: "Love",
      trending: true,
      trendingRank: 1,
    },
    {
      author: {
        name: "Marcus Vale",
        username: "marcusvale",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      title: "Urban Solitude",
      content: `Between concrete towers I walk alone,
City lights paint shadows on my face,
In this maze of glass and stone,
I search for a familiar place.

The crowd moves like a rushing stream,
Yet I stand still, an island here,
Lost in some forgotten dream,
Where silence is all I hear.`,
      likes: 1567,
      comments: 143,
      timestamp: "5h ago",
      category: "Urban Life",
      trending: true,
      trendingRank: 2,
    },
    {
      author: {
        name: "Emily Rivers",
        username: "emilyrivers",
        avatar: "https://images.unsplash.com/photo-1624537046903-1e4acee0487f?w=100&h=100&fit=crop",
      },
      title: "Healing Waters",
      content: `Let the river carry away your pain,
Watch it dissolve in the endless flow,
Like morning dew in gentle rain,
Let healing waters help you grow.

The current knows which way to go,
Trust the journey, trust the tide,
In time, your heart will overflow,
With peace that dwells inside.`,
      likes: 1423,
      comments: 198,
      timestamp: "7h ago",
      category: "Healing",
      trending: true,
      trendingRank: 3,
    },
    {
      author: {
        name: "James Winters",
        username: "jwinters",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      title: "Digital Age",
      content: `We scroll through lives we'll never live,
Through filters and facades we see,
Connection that we try to give,
But lose ourselves in binary.

A thousand friends, yet so alone,
A million words, but nothing said,
Behind the glow of every phone,
Are hearts that long to be truly fed.`,
      likes: 1289,
      comments: 156,
      timestamp: "9h ago",
      category: "Modern Life",
      trending: true,
      trendingRank: 4,
    },
    {
      author: {
        name: "Luna Martinez",
        username: "lunapoet",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      },
      title: "Phoenix Rising",
      content: `From ashes of who I used to be,
I spread my wings and learn to fly,
The fire that once consumed me,
Now lifts me toward the sky.

Scars are stories I now wear,
Proof that I survived the flame,
Rising through the smoke and air,
I'll never be the same.`,
      likes: 1156,
      comments: 134,
      timestamp: "11h ago",
      category: "Resilience",
      trending: true,
      trendingRank: 5,
    },
    {
      author: {
        name: "David Kim",
        username: "davidkim",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      content: `coffee steam rises—
morning light through the window
another chance waits`,
      likes: 1045,
      comments: 89,
      timestamp: "14h ago",
      category: "Haiku",
      trending: true,
      trendingRank: 6,
    },
  ];

  const trendingAuthors = [
    {
      name: "Sarah Chen",
      username: "@sarahwrites",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      followers: "12.5K",
      posts: 234,
    },
    {
      name: "Marcus Vale",
      username: "@marcusvale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      followers: "10.2K",
      posts: 189,
    },
    {
      name: "Emily Rivers",
      username: "@emilyrivers",
      avatar: "https://images.unsplash.com/photo-1624537046903-1e4acee0487f?w=100&h=100&fit=crop",
      followers: "9.8K",
      posts: 156,
    },
  ];

  const trendingTopics = [
    { name: "Healing", count: "2.3K posts", trending: "+125%" },
    { name: "Love Poetry", count: "1.8K posts", trending: "+98%" },
    { name: "Nature", count: "1.5K posts", trending: "+76%" },
    { name: "Self Discovery", count: "1.2K posts", trending: "+65%" },
    { name: "Urban Life", count: "987 posts", trending: "+54%" },
    { name: "Haiku", count: "876 posts", trending: "+43%" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            <Flame className="w-6 h-6" style={{ color: 'var(--theme-primary)' }} />
          </div>
          <h1 style={{ color: 'var(--theme-text)' }}>Trending</h1>
        </div>
        <p style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
          Discover the most popular poems and stories right now
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={timeFilter === "today" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("today")}
          className="rounded-xl"
          style={{
            background: timeFilter === "today" 
              ? `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
              : 'transparent',
            color: timeFilter === "today" ? 'white' : 'var(--theme-primary)',
            borderColor: timeFilter === "today" ? 'transparent' : 'var(--theme-primary)',
          }}
        >
          <Clock className="w-4 h-4 mr-2" />
          Today
        </Button>
        <Button
          variant={timeFilter === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("week")}
          className="rounded-xl"
          style={{
            background: timeFilter === "week" 
              ? `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
              : 'transparent',
            color: timeFilter === "week" ? 'white' : 'var(--theme-primary)',
            borderColor: timeFilter === "week" ? 'transparent' : 'var(--theme-primary)',
          }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          This Week
        </Button>
        <Button
          variant={timeFilter === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("month")}
          className="rounded-xl"
          style={{
            background: timeFilter === "month" 
              ? `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
              : 'transparent',
            color: timeFilter === "month" ? 'white' : 'var(--theme-primary)',
            borderColor: timeFilter === "month" ? 'transparent' : 'var(--theme-primary)',
          }}
        >
          This Month
        </Button>
        <Button
          variant={timeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeFilter("all")}
          className="rounded-xl"
          style={{
            background: timeFilter === "all" 
              ? `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`
              : 'transparent',
            color: timeFilter === "all" ? 'white' : 'var(--theme-primary)',
            borderColor: timeFilter === "all" ? 'transparent' : 'var(--theme-primary)',
          }}
        >
          All Time
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Posts - Main Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ color: 'var(--theme-text)' }}>Top Posts</h3>
            <Badge 
              className="px-3 py-1"
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: 'var(--theme-primary)',
              }}
            >
              Updated hourly
            </Badge>
          </div>
          
          {trendingPosts.map((post, index) => (
            <div key={index} className="relative">
              {/* Trending Rank Badge */}
              <div 
                className="absolute -left-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10"
                style={{
                  background: index < 3 
                    ? `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`
                    : 'var(--theme-accent)',
                  color: index < 3 ? 'white' : 'var(--theme-primary)',
                }}
              >
                <span className="font-bold">{index + 1}</span>
              </div>
              <PostCard {...post} />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Authors */}
          <div 
            className="rounded-2xl p-5 shadow-md"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              border: `1px solid var(--theme-primary)33`,
            }}
          >
            <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--theme-text)' }}>
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
              Trending Authors
            </h3>
            <div className="space-y-4">
              {trendingAuthors.map((author, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(to bottom right, var(--theme-primary), var(--theme-secondary))`,
                      color: 'white',
                    }}
                  >
                    {index + 1}
                  </div>
                  <img 
                    src={author.avatar} 
                    alt={author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ color: 'var(--theme-text)' }}>
                      <strong>{author.name}</strong>
                    </p>
                    <p className="text-sm truncate" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                      {author.followers} followers
                    </p>
                  </div>
                  <Button 
                    size="sm"
                    className="rounded-lg"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: 'white',
                    }}
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div 
            className="rounded-2xl p-5 shadow-md"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              border: `1px solid var(--theme-primary)33`,
            }}
          >
            <h3 className="mb-4 flex items-center gap-2" style={{ color: 'var(--theme-text)' }}>
              <Flame className="w-5 h-5" style={{ color: 'var(--theme-primary)' }} />
              Hot Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <button 
                  key={index}
                  className="w-full text-left p-3 rounded-xl transition-all hover:shadow-sm"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--theme-primary)22';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p style={{ color: 'var(--theme-text)' }}>
                        <strong>#{topic.name}</strong>
                      </p>
                      <p className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                        {topic.count}
                      </p>
                    </div>
                    <Badge 
                      className="px-2 py-0.5 flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--theme-primary)',
                        color: 'white',
                      }}
                    >
                      {topic.trending}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}