# 📡 react-pusher-client

[![npm version](https://img.shields.io/npm/v/react-pusher-client?color=crimson&label=npm&logo=npm)](https://www.npmjs.com/package/react-pusher-client)
[![License](https://img.shields.io/github/license/devnickjr/pusher-react?color=blue)](https://github.com/devnickjr/pusher-react/blob/main/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/devnickjr/pusher-react/ci.yml?branch=main&label=build)](https://github.com/devnickjr/pusher-react/actions)
[![GitHub stars](https://img.shields.io/github/stars/devnickjr/pusher-react?style=social)](https://github.com/devnickjr/pusher-react/stargazers)
[![GitHub Repo](https://img.shields.io/badge/github-repo-blue?logo=github)](https://github.com/devnickjr/pusher-react)

A lightweight React/Next.js wrapper for [Pusher](https://pusher.com/) that simplifies client-side usage with hooks, connection state tracking, and auto-channel binding.

---

## ✨ Features

- ✅ Simple Pusher client initialization
- 🔄 Track connection state with hooks
- 🧠 Auto-bind to channels/events
- 🧪 Works seamlessly in React or Next.js apps
- 🧩 Ideal for real-time dashboards, chat, notifications
- 🔧 Full control over Pusher client and custom hooks:

---

## 📦 Installation

```bash
npm install react-pusher-client pusher-js
```

---

##  🏁 Getting Started

1. Initialize Pusher Client 🔑

The first step is to initialize Pusher by providing your Pusher Key and optionally configuring the options (typically in a top-level component).

```javascript
import { initPusher } from 'react-pusher-client';
// Initialize Pusher in your app
initPusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});
```
2. Using Hooks 📌

After initializing Pusher, you can use the provided hooks to interact with Pusher Channels, monitor connection states, and handle events.


## API Reference 📚

# initPusher(key: string, options?: Pusher.Options) 🔧

Description: Initializes the Pusher client with the provided key and optional configuration. This function must be called once at the entry point of your app, before using any other hook.

# Parameters:

key: The Pusher key obtained from your Pusher Dashboard.

options (optional): Additional configuration options for Pusher (e.g., cluster, encrypted).

# Usage:

```typescript
import { initPusher } from 'react-pusher-client';

// Initialize the Pusher client
initPusher('your-pusher-key', {
  cluster: 'your-cluster',
});
```
---

# usePusherEvent<T>(channelName: string, eventName: string): T | null 🔄

Description: A hook that listens for events on a specified Pusher channel and returns the event data.

Parameters:

channelName: The name of the channel to subscribe to.

eventName: The name of the event to listen for.

Returns:

The event data (T) received from Pusher, or null if no data is received.

# Usage:

```typescript
import { usePusherEvent } from 'react-pusher-client';

const message = usePusherEvent<{ user: string; message: string }>('chat', 'new-message');

return (
  <div>
    {message ? (
      <p>
        <strong>{message.user}:</strong> {message.message}
      </p>
    ) : (
      <p>Waiting for messages...</p>
    )}
  </div>
);
```

# usePusherConnection(): string 🌐

Description: A hook that tracks the Pusher connection state. The connection state can be one of the following:

connecting

connected

disconnected

reconnecting

failed

Returns:

The current connection state as a string.

# Usage:

```typescript
import { usePusherConnection } from 'react-pusher-client';

const connectionStatus = usePusherConnection();

return <p>Connection Status: {connectionStatus}</p>;
```

# usePresenceChannel(channelName: string): PresenceMember[] 🧑‍🤝‍🧑

Description: A hook that listens for updates on a Presence Channel and returns the list of online members. Presence channels are used to track users in real-time.
```

Parameters:

channelName: The name of the presence channel to subscribe to.

Returns:

An array of presence members. Each member has an id and other custom properties.

# Usage:

```typescript
import { usePresenceChannel } from 'react-pusher-client';

const onlineUsers = usePresenceChannel('chat');

return (
  <div>
    <h3>Online Users:</h3>
    <ul>
      {onlineUsers.map((user) => (
        <li key={user.id}>{user.id}</li>
      ))}
    </ul>
  </div>
);
```

# Custom Hook Example:

If you want full control over the Pusher client, you can directly access it via getPusher():

```typescript
import { useEffect, useState } from 'react';
import { getPusher } from './lib/pusherClient';

const useCustomChannel = (channelName: string) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher!.subscribe(channelName);

    const handleNewMessage = (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    channel.bind('new-message', handleNewMessage);

    return () => {
      channel.unbind('new-message', handleNewMessage);
      pusher!.unsubscribe(channelName);
    };
  }, [channelName]);

  return messages;
};
```

# Environment Variables 🌍
You should set the following environment variables in your .env.local (or .env) file:

```bash
NEXT_PUBLIC_PUSHER_KEY=your-pusher-key
NEXT_PUBLIC_PUSHER_CLUSTER!=your-cluster
```
This will make sure the Pusher key and cluster are accessible throughout your app, especially during development and production builds.

# Best Practices 💡
- Single Initialization: Always call initPusher at the entry point of your app (e.g., in _app.tsx for Next.js apps) to ensure that the Pusher client is initialized only once.
- Efficient Event Listening: Use the usePusherEvent hook for event-based updates and the usePusherConnection hook to track connection status. Avoid subscribing to unnecessary channels or events to minimize unnecessary re-renders and optimize performance.
- Presence Channel Management: Use usePresenceChannel to track the state of users in real-time. Make sure to unsubscribe from channels when they are no longer needed to avoid memory leaks.

# Troubleshooting ⚠️
If you encounter any issues, please check the following:

Ensure that you have correctly set your Pusher key and cluster in your environment variables.
Ensure that you are only calling initPusher once in your app.
Verify that the channelName and eventName you are using are correct.

# Contributing 🤝
We welcome contributions to make `pusher-react` better! If you have ideas, bugs, or features you'd like to add:

- Fork the repo
- Create your feature branch: `git checkout -b feat/your-feature`
- Commit your changes: `git commit -m 'Add amazing feature'`
- Push to the branch: `git push origin feat/your-feature`
- Open a pull request ✅

**GitHub Repository**: [github.com/devnickjr/pusher-react](https://github.com/devnickjr/pusher-react)

# License 📄
This project is licensed under the MIT License - see the LICENSE file for details.





