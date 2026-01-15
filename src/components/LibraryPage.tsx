import { useState } from "react";
import { BookOpen, Heart, Bookmark, FolderOpen, Plus, Grid, List, Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { PostCard } from "./PostCard";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function LibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const savedPosts = [
    {
      author: {
        name: "Emily Rivers",
        username: "emilyrivers",
        avatar: "https://images.unsplash.com/photo-1624537046903-1e4acee0487f?w=100&h=100&fit=crop",
      },
      title: "Whispers of Autumn",
      content: `Golden leaves dance in the breeze,
A symphony of amber and rust,
Time whispers through the trees,
In nature's gentle, fading trust.`,
      likes: 342,
      comments: 28,
      timestamp: "2h ago",
      category: "Nature",
      savedDate: "2 days ago",
    },
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
With you, I've never felt alone.`,
      likes: 892,
      comments: 67,
      timestamp: "6h ago",
      category: "Love",
      savedDate: "5 days ago",
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
I search for a familiar place.`,
      likes: 567,
      comments: 43,
      timestamp: "4h ago",
      category: "Urban Life",
      savedDate: "1 week ago",
    },
  ];

  const myPosts = [
    {
      author: {
        name: "Luna Martinez",
        username: "lunapoet",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      },
      title: "The Writer's Desk",
      content: `Ink bleeds across the page tonight,
Words tumble from my weary soul,
Each letter holds a piece of light,
Each verse attempts to make me whole.`,
      likes: 445,
      comments: 35,
      timestamp: "2 days ago",
      category: "Writing",
    },
    {
      author: {
        name: "Luna Martinez",
        username: "lunapoet",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      },
      title: "Morning Rituals",
      content: `Coffee steam rises like morning prayers,
The sun spills gold across my floor,
In these quiet moments, nobody cares,
About the chaos that waits beyond the door.`,
      likes: 567,
      comments: 42,
      timestamp: "5 days ago",
      category: "Daily Life",
    },
  ];

  const collections = [
    {
      name: "Healing Words",
      description: "Poems that bring comfort during difficult times",
      postCount: 24,
      coverColor: "#d4756f",
      lastUpdated: "2 days ago",
    },
    {
      name: "Nature's Beauty",
      description: "Poetry inspired by the natural world",
      postCount: 18,
      coverColor: "#8fb5c9",
      lastUpdated: "5 days ago",
    },
    {
      name: "Love & Heartbreak",
      description: "Emotional journeys through relationships",
      postCount: 31,
      coverColor: "#c9a28f",
      lastUpdated: "1 week ago",
    },
    {
      name: "Late Night Thoughts",
      description: "Reflections written in the quiet hours",
      postCount: 15,
      coverColor: "#a8c9a3",
      lastUpdated: "3 days ago",
    },
  ];

  const readingHistory = [
    {
      author: {
        name: "James Winters",
        username: "jwinters",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      },
      title: "Digital Age",
      content: `We scroll through lives we'll never live,
Through filters and facades we see...`,
      likes: 234,
      comments: 19,
      timestamp: "8h ago",
      category: "Modern Life",
      readDate: "30 minutes ago",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            >
              <BookOpen className="w-6 h-6" style={{ color: 'var(--theme-primary)' }} />
            </div>
            <div>
              <h1 style={{ color: 'var(--theme-text)' }}>Your Library</h1>
              <p className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                All your saved content in one place
              </p>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-lg"
              style={{
                backgroundColor: viewMode === "list" ? 'var(--theme-primary)' : 'transparent',
                color: viewMode === "list" ? 'white' : 'var(--theme-primary)',
                borderColor: 'var(--theme-primary)',
              }}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-lg"
              style={{
                backgroundColor: viewMode === "grid" ? 'var(--theme-primary)' : 'transparent',
                color: viewMode === "grid" ? 'white' : 'var(--theme-primary)',
                borderColor: 'var(--theme-primary)',
              }}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div 
          className="p-4 rounded-2xl shadow-sm"
          style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: `1px solid var(--theme-primary)33`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Bookmark className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <span className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>Saved</span>
          </div>
          <p style={{ color: 'var(--theme-text)' }}><strong>156</strong> posts</p>
        </div>
        <div 
          className="p-4 rounded-2xl shadow-sm"
          style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: `1px solid var(--theme-primary)33`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <span className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>Collections</span>
          </div>
          <p style={{ color: 'var(--theme-text)' }}><strong>{collections.length}</strong> collections</p>
        </div>
        <div 
          className="p-4 rounded-2xl shadow-sm"
          style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: `1px solid var(--theme-primary)33`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <span className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>Your Posts</span>
          </div>
          <p style={{ color: 'var(--theme-text)' }}><strong>156</strong> posts</p>
        </div>
        <div 
          className="p-4 rounded-2xl shadow-sm"
          style={{
            backgroundColor: 'var(--theme-card-bg)',
            border: `1px solid var(--theme-primary)33`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
            <span className="text-sm" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>Read</span>
          </div>
          <p style={{ color: 'var(--theme-text)' }}><strong>432</strong> posts</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="saved" className="w-full">
        <TabsList 
          className="grid w-full grid-cols-4 mb-6 rounded-xl shadow-md"
          style={{ backgroundColor: 'var(--theme-accent)' }}
        >
          <TabsTrigger value="saved" className="rounded-xl">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved
          </TabsTrigger>
          <TabsTrigger value="collections" className="rounded-xl">
            <FolderOpen className="w-4 h-4 mr-2" />
            Collections
          </TabsTrigger>
          <TabsTrigger value="myposts" className="rounded-xl">
            <BookOpen className="w-4 h-4 mr-2" />
            My Posts
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">
            <Clock className="w-4 h-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Saved Posts */}
        <TabsContent value="saved">
          <div className="flex items-center justify-between mb-4">
            <p style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
              {savedPosts.length} saved posts
            </p>
          </div>
          <div className="space-y-4">
            {savedPosts.map((post, index) => (
              <div key={index} className="relative">
                <PostCard {...post} />
                <div 
                  className="absolute top-4 right-4 px-2 py-1 rounded-lg text-xs"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  Saved {post.savedDate}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Collections */}
        <TabsContent value="collections">
          <div className="mb-4 flex justify-between items-center">
            <p style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
              {collections.length} collections
            </p>
            <Button 
              size="sm"
              className="rounded-xl text-white shadow-md"
              style={{
                background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Collection
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection, index) => (
              <button
                key={index}
                className="text-left p-6 rounded-2xl shadow-md transition-all hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  border: `1px solid var(--theme-primary)33`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: collection.coverColor + '33' }}
                  >
                    <FolderOpen 
                      className="w-8 h-8" 
                      style={{ color: collection.coverColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1" style={{ color: 'var(--theme-text)' }}>
                      {collection.name}
                    </h3>
                    <p 
                      className="text-sm mb-2 line-clamp-2"
                      style={{ color: 'var(--theme-text)', opacity: 0.7 }}
                    >
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge 
                        variant="secondary"
                        className="px-2 py-0.5"
                        style={{
                          backgroundColor: 'var(--theme-accent)',
                          color: 'var(--theme-primary)',
                        }}
                      >
                        {collection.postCount} posts
                      </Badge>
                      <span style={{ color: 'var(--theme-text)', opacity: 0.5 }}>
                        Updated {collection.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        {/* My Posts */}
        <TabsContent value="myposts">
          <div className="flex items-center justify-between mb-4">
            <p style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
              {myPosts.length} published posts
            </p>
            <Button 
              size="sm"
              className="rounded-xl text-white shadow-md"
              style={{
                background: `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Write New Post
            </Button>
          </div>
          <div className="space-y-4">
            {myPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        </TabsContent>

        {/* Reading History */}
        <TabsContent value="history">
          <div className="mb-4">
            <p style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
              Recently read posts
            </p>
          </div>
          <div className="space-y-4">
            {readingHistory.map((post, index) => (
              <div key={index} className="relative">
                <PostCard {...post} />
                <div 
                  className="absolute top-4 right-4 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'var(--theme-primary)',
                  }}
                >
                  <Clock className="w-3 h-3" />
                  Read {post.readDate}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}