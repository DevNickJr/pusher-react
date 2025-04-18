import { useEffect, useState } from 'react';
import { getPusher } from './client';
import * as PusherType from 'pusher-js';

type PresenceMember = {
  id: string;
  [key: string]: any;
};

export function usePresenceChannel(channelName: string): PresenceMember[] {
  const [members, setMembers] = useState<PresenceMember[]>([]);

  useEffect(() => {
    const pusher = getPusher();
    const channel = pusher.subscribe(`presence-${channelName}`) as PusherType.PresenceChannel;

    const update = () => {
      const current = channel.members;
      const list: PresenceMember[] = [];
      current.each((member: any) => list.push(member.info || { id: member.id }));
      setMembers(list);
    };

    channel.bind('pusher:subscription_succeeded', update);
    channel.bind('pusher:member_added', update);
    channel.bind('pusher:member_removed', update);

    return () => {
      channel.unbind('pusher:subscription_succeeded', update);
      channel.unbind('pusher:member_added', update);
      channel.unbind('pusher:member_removed', update);
      pusher.unsubscribe(`presence-${channelName}`);
    };
  }, [channelName]);

  return members;
}
