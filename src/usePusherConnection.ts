import { useEffect, useState } from 'react';
import { getPusher } from './client';

export function usePusherConnection(): string {
  const [status, setStatus] = useState(() => getPusher().connection.state);

  useEffect(() => {
    const pusher = getPusher();
    const handler = () => setStatus(pusher.connection.state);

    pusher.connection.bind('state_change', handler);

    return () => {
      pusher.connection.unbind('state_change', handler);
    };
  }, []);

  return status;
}
