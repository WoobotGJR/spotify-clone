'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayer from '@/hooks/usePlayer';
import PlayerContent from './PlayerContent';

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song ?? undefined);

  if (!song || !player.activeId || !songUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      {/* 
            Key is used here to force re-render when songUrl changes
            so we can completly destroy previous audio element, before
            creating a new one
        */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
export default Player;
