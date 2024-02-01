import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Song } from '@/types';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

interface LibraryProps {
  userSongs: Song[];
}

const Library: React.FC<LibraryProps> = ({ userSongs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(userSongs);

  const onCLick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <TbPlaylist className="text-neutral-400" size={26}></TbPlaylist>
        <p className="text-neutral-400 font-medium">Your Library</p>
        <AiOutlinePlus
          onClick={onCLick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {userSongs.map((userSong) => (
          <MediaItem
            key={userSong.id}
            data={userSong}
            onClick={(id: string) => {
              onPlay(id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
