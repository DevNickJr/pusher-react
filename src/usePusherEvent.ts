import { useEffect, useState } from 'react';
import { getPusher } from './client';

export function usePusherEvent<T = any>(channelName: string, eventName: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(channelName);
    const handler = (data: T) => setData(data);

    channel.bind(eventName, handler);

    return () => {
      channel.unbind(eventName, handler);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName]);

  return data;
}
