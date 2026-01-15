import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

// Health check endpoint
app.get("/make-server-927350a6/health", (c) => {
  return c.json({ status: "ok", message: "Server is running", timestamp: Date.now() });
});

// Talking Buddy Routes

// Join as listener or seeker
app.post("/make-server-927350a6/buddy/join", async (c) => {
  try {
    const { userId, role } = await c.req.json();

    if (!userId || !role) {
      return c.json({ error: "Missing userId or role" }, 400);
    }

    console.log(`User ${userId} joining as ${role}`);

    // Store user in waiting queue
    await kv.set(`buddy:user:${userId}`, {
      userId,
      role,
      status: "waiting",
      timestamp: Date.now(),
    });

    // For now, return unmatched - users will chat with AI bot
    return c.json({ 
      matched: false, 
      sessionId: `ai_session_${userId}_${Date.now()}`,
      message: "Connected to AI support buddy" 
    });
  } catch (error) {
    console.error("Error in buddy/join:", error);
    return c.json({ error: "Failed to join" }, 500);
  }
});

// Get messages for a session
app.get("/make-server-927350a6/buddy/messages", async (c) => {
  try {
    const sessionId = c.req.query("sessionId");
    
    if (!sessionId) {
      return c.json({ error: "Missing sessionId" }, 400);
    }

    const session = await kv.get(`buddy:session:${sessionId}`);
    
    if (!session) {
      return c.json({ messages: [] });
    }

    return c.json({ messages: session.messages || [] });
  } catch (error) {
    console.error("Error getting messages:", error);
    return c.json({ messages: [] });
  }
});

// Send a message
app.post("/make-server-927350a6/buddy/send", async (c) => {
  try {
    const { sessionId, userId, message } = await c.req.json();
    
    if (!sessionId || !userId || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const session = await kv.get(`buddy:session:${sessionId}`) || { messages: [] };
    
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: message,
      sender: userId,
      timestamp: Date.now(),
    };

    session.messages = [...(session.messages || []), newMessage];
    await kv.set(`buddy:session:${sessionId}`, session);

    return c.json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

// Leave a session
app.post("/make-server-927350a6/buddy/leave", async (c) => {
  try {
    const { userId, sessionId } = await c.req.json();
    
    if (userId) {
      await kv.del(`buddy:user:${userId}`);
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error leaving session:", error);
    return c.json({ success: true }); // Return success even on error
  }
});

// Send friend request
app.post("/make-server-927350a6/buddy/friend-request", async (c) => {
  try {
    const { fromUserId, toUserId, sessionId } = await c.req.json();
    
    const request = {
      fromUserId,
      toUserId,
      sessionId,
      status: "pending",
      timestamp: Date.now(),
    };

    await kv.set(`buddy:friend_request:${fromUserId}:${toUserId}`, request);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error sending friend request:", error);
    return c.json({ error: "Failed to send friend request" }, 500);
  }
});

// Get friend request status
app.get("/make-server-927350a6/buddy/friend-request-status", async (c) => {
  try {
    const userId = c.req.query("userId");
    const sessionId = c.req.query("sessionId");
    
    if (!userId) {
      return c.json({ request: null });
    }

    // Check for incoming requests
    const requests = await kv.getByPrefix(`buddy:friend_request:`);
    const incomingRequest = requests.find((r: any) => 
      r.toUserId === userId && r.status === "pending"
    );

    return c.json({ request: incomingRequest || null });
  } catch (error) {
    console.error("Error getting friend request status:", error);
    return c.json({ request: null });
  }
});

// Accept friend request
app.post("/make-server-927350a6/buddy/accept-friend", async (c) => {
  try {
    const { fromUserId, toUserId, sessionId } = await c.req.json();
    
    // Update request status
    await kv.set(`buddy:friend_request:${fromUserId}:${toUserId}`, {
      fromUserId,
      toUserId,
      sessionId,
      status: "accepted",
      timestamp: Date.now(),
    });

    // Save chat for both users
    const session = await kv.get(`buddy:session:${sessionId}`);
    
    if (session) {
      const chatData = {
        sessionId,
        friendId: fromUserId === toUserId ? fromUserId : toUserId,
        messages: session.messages || [],
        createdAt: Date.now(),
      };

      // Save for both users
      const userChats = await kv.get(`buddy:saved_chats:${toUserId}`) || { chats: [] };
      userChats.chats.push(chatData);
      await kv.set(`buddy:saved_chats:${toUserId}`, userChats);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    return c.json({ error: "Failed to accept friend request" }, 500);
  }
});

// Decline friend request
app.post("/make-server-927350a6/buddy/decline-friend", async (c) => {
  try {
    const { fromUserId, toUserId } = await c.req.json();
    
    await kv.del(`buddy:friend_request:${fromUserId}:${toUserId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error declining friend request:", error);
    return c.json({ success: true }); // Return success even on error
  }
});

// Get saved chats for a user
app.get("/make-server-927350a6/buddy/saved-chats", async (c) => {
  try {
    const userId = c.req.query("userId");
    
    if (!userId) {
      return c.json({ chats: [] });
    }

    const data = await kv.get(`buddy:saved_chats:${userId}`);
    
    return c.json({ chats: data?.chats || [] });
  } catch (error) {
    console.error("Error getting saved chats:", error);
    return c.json({ chats: [] });
  }
});

// Send message in saved chat
app.post("/make-server-927350a6/buddy/send-saved", async (c) => {
  try {
    const { userId, chatId, message } = await c.req.json();
    
    const data = await kv.get(`buddy:saved_chats:${userId}`) || { chats: [] };
    const chatIndex = data.chats.findIndex((chat: any) => chat.sessionId === chatId);
    
    if (chatIndex !== -1) {
      const newMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: message,
        sender: userId,
        timestamp: Date.now(),
      };
      
      data.chats[chatIndex].messages.push(newMessage);
      await kv.set(`buddy:saved_chats:${userId}`, data);
      
      return c.json({ success: true, message: newMessage });
    }
    
    return c.json({ error: "Chat not found" }, 404);
  } catch (error) {
    console.error("Error sending message in saved chat:", error);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

Deno.serve(app.fetch);