import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

let pusherClient: Pusher;

export const initPusher = (key: string, options: PusherTypes.Options | { cluster: string }) => {
  // Runtime version check
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    const version = (Pusher as unknown as { VERSION?: string }).VERSION?.split('.')[0];

    const major = parseInt(version || '0', 10);

    if (major >= 9) {
      console.warn(
        '%c[react-pusher-client]%c ⚠️ Detected pusher-js version 9 or higher.\n' +
        'This version is not officially supported and may break your app.\n' +
        'Please downgrade to pusher-js v8 until support is confirmed.',
        'color: #f87171; font-weight: bold;',
        'color: inherit;'
      );
    }
  }
  pusherClient = new Pusher(key, options);

  pusherClient.connection.bind("error", function (err: { error: { data: { code: number } } }) {
    if (err.error.data.code === 4004) {
      console.log(">>> detected limit error");
    }
  });

  return pusherClient;
};

export const getPusher = () => {
  if (!pusherClient) {
    console.warn('Pusher not initialized');
    return null; // or throw, depending on your use case
  }
  return pusherClient;
};



