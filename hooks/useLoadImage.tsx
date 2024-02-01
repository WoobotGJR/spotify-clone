import { Song } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imgData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imgData.publicUrl;
};
