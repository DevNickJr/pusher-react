import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

let pusherClient: Pusher;

export const initPusher = (key: string, options: PusherTypes.Options | { cluster: string }) => {
  pusherClient = new Pusher(key, options);
};

export const getPusher = () => {
  if (!pusherClient) throw new Error('Pusher has not been initialized. Call initPusher first.');
  return pusherClient;
};
