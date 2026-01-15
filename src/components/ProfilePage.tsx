import { useState } from "react";
import { Heart, MessageCircle, MapPin, Calendar, Edit2, Settings, Users, BookOpen, Award } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { PostCard } from "./PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile] = useState(true); // Toggle this to test other user's profile view

  // Mock user data
  const user = {
    name: "Luna Martinez",
    username: "@lunapoet",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
    bio: "Writing my way through the chaos. Poet, dreamer, and eternal optimist. Sharing verses that heal and inspire. 🌙✨",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    isMotivator: true,
    stats: {
      posts: 156,
      followers: 2847,
      following: 342,
    },
    interests: ["Poetry", "Nature Writing", "Free Verse", "Emotional Healing"],
  };

  // Mock posts data
  const userPosts = [
    {
      author: {
        name: user.name,
        username: user.username.slice(1),
        avatar: user.avatar,
      },
      title: "The Writer's Desk",
      content: `Ink bleeds across the page tonight,
Words tumble from my weary soul,
Each letter holds a piece of light,
Each verse attempts to make me whole.

The blank page stares, demanding more,
My pen, a sword against the void,
I wage this war like those before,
To craft the truth I've long avoided.`,
      likes: 445,
      comments: 35,
      timestamp: "2 days ago",
      category: "Writing",
    },
    {
      author: {
        name: user.name,
        username: user.username.slice(1),
        avatar: user.avatar,
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
    {
      author: {
        name: user.name,
        username: user.username.slice(1),
        avatar: user.avatar,
      },
      content: `moonlight whispers
secrets to the sleeping earth—
my heart listens close`,
      likes: 234,
      comments: 18,
      timestamp: "1 week ago",
      category: "Haiku",
    },
  ];

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
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div 
        className="w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-6 shadow-lg"
        style={{
          backgroundImage: `url(${user.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Profile Header */}
      <div className="px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Avatar */}
          <div className="flex flex-col items-center md:items-start -mt-16 md:-mt-20">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 shadow-xl" style={{ borderColor: 'var(--theme-background)' }}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {user.isMotivator && (
              <Badge 
                className="mt-3 px-4 py-1 shadow-md"
                style={{ 
                  backgroundColor: 'var(--theme-primary)',
                  color: 'white',
                }}
              >
                <Award className="w-3 h-3 mr-1" />
                Motivator
              </Badge>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h1 style={{ color: 'var(--theme-text)' }}>{user.name}</h1>
              <span className="opacity-60" style={{ color: 'var(--theme-text)' }}>{user.username}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4 justify-center md:justify-start">
              {isOwnProfile ? (
                <>
                  <Button 
                    variant="outline"
                    className="rounded-xl shadow-sm"
                    style={{
                      borderColor: 'var(--theme-primary)',
                      color: 'var(--theme-primary)',
                    }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline"
                    className="rounded-xl shadow-sm"
                    style={{
                      borderColor: 'var(--theme-primary)',
                      color: 'var(--theme-primary)',
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="rounded-xl shadow-md text-white"
                    style={{
                      background: isFollowing 
                        ? 'var(--theme-accent)'
                        : `linear-gradient(to right, var(--theme-primary), var(--theme-secondary))`,
                      color: isFollowing ? 'var(--theme-primary)' : 'white',
                    }}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button 
                    variant="outline"
                    className="rounded-xl shadow-sm"
                    style={{
                      borderColor: 'var(--theme-primary)',
                      color: 'var(--theme-primary)',
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Bio */}
            <p className="mb-4 max-w-2xl" style={{ color: 'var(--theme-text)', opacity: 0.8 }}>
              {user.bio}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm mb-4 justify-center md:justify-start">
              <div className="flex items-center gap-1" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                <MapPin className="w-4 h-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-1" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                <Calendar className="w-4 h-4" />
                Joined {user.joinDate}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 justify-center md:justify-start">
              <button className="hover:opacity-80 transition-opacity">
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>{user.stats.posts}</strong> Posts
                </span>
              </button>
              <button className="hover:opacity-80 transition-opacity">
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>{user.stats.followers.toLocaleString()}</strong> Followers
                </span>
              </button>
              <button className="hover:opacity-80 transition-opacity">
                <span style={{ color: 'var(--theme-text)' }}>
                  <strong>{user.stats.following}</strong> Following
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-6">
          {user.interests.map((interest, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="px-3 py-1 rounded-full shadow-sm"
              style={{
                backgroundColor: 'var(--theme-accent)',
                color: 'var(--theme-primary)',
              }}
            >
              {interest}
            </Badge>
          ))}
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList 
            className="grid w-full grid-cols-3 mb-6 rounded-xl shadow-md"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            <TabsTrigger value="posts" className="rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl">
              <Heart className="w-4 h-4 mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="about" className="rounded-xl">
              <Users className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4 md:space-y-6">
            {userPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
            {userPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen 
                  className="w-12 h-12 mx-auto mb-4" 
                  style={{ color: 'var(--theme-primary)', opacity: 0.5 }}
                />
                <p style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                  No posts yet. Share your first piece!
                </p>
              </div>
            )}
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-4 md:space-y-6">
            {savedPosts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
            {savedPosts.length === 0 && (
              <div className="text-center py-12">
                <Heart 
                  className="w-12 h-12 mx-auto mb-4" 
                  style={{ color: 'var(--theme-primary)', opacity: 0.5 }}
                />
                <p style={{ color: 'var(--theme-text)', opacity: 0.6 }}>
                  No saved posts yet. Heart posts to save them here!
                </p>
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div 
              className="rounded-2xl p-6 shadow-md"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                border: `1px solid var(--theme-primary)33`,
              }}
            >
              <h3 className="mb-4" style={{ color: 'var(--theme-text)' }}>About {user.name.split(' ')[0]}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2" style={{ color: 'var(--theme-primary)' }}>Bio</h4>
                  <p style={{ color: 'var(--theme-text)', opacity: 0.8 }}>
                    {user.bio}
                  </p>
                </div>

                {user.isMotivator && (
                  <div>
                    <h4 className="mb-2" style={{ color: 'var(--theme-primary)' }}>Talking Buddy Role</h4>
                    <div 
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: 'var(--theme-accent)' }}
                    >
                      <Award className="w-5 h-5 mt-0.5" style={{ color: 'var(--theme-primary)' }} />
                      <div>
                        <p style={{ color: 'var(--theme-text)' }}>
                          <strong>Certified Motivator & Listener</strong>
                        </p>
                        <p className="text-sm mt-1" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                          Available to support and listen to those going through difficult times. 
                          Here to provide a compassionate ear and gentle encouragement.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="mb-2" style={{ color: 'var(--theme-primary)' }}>Writing Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="px-3 py-1 rounded-full"
                        style={{
                          borderColor: 'var(--theme-primary)',
                          color: 'var(--theme-primary)',
                        }}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2" style={{ color: 'var(--theme-primary)' }}>Activity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: 'var(--theme-accent)' }}
                    >
                      <div style={{ color: 'var(--theme-primary)' }}>
                        {user.stats.posts}
                      </div>
                      <p className="text-sm mt-1" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                        Total Posts
                      </p>
                    </div>
                    <div 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: 'var(--theme-accent)' }}
                    >
                      <div style={{ color: 'var(--theme-primary)' }}>
                        2.8K
                      </div>
                      <p className="text-sm mt-1" style={{ color: 'var(--theme-text)', opacity: 0.7 }}>
                        Total Likes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}