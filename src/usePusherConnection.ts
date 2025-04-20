import { useEffect, useState } from 'react';
import { getPusher } from './client';

export function usePusherConnection(): string {
  const [status, setStatus] = useState(() => getPusher()?.connection.state || 'disconnected');

  useEffect(() => {
    const pusher = getPusher();
    if (!pusher) return;

    const handler = () => setStatus(pusher.connection.state);

    pusher.connection.bind('state_change', handler);

    return () => {
      pusher.connection.unbind('state_change', handler);
    };
  }, []);

  return status;
}
