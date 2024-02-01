import useUploadModal from '@/hooks/useUploadModal';
import Modal from './Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from './Input';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

interface Props {}
const UploadModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const { isOpen, onOpen, onClose } = useUploadModal();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { author: '', title: '', song: null, image: null },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imgFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imgFile || !songFile || !user) {
        toast.error('Please select an image and a song file');
        return;
      }

      const id = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${id}.mp3`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        toast.error('Song upload failed!');
      }

      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from('images')
        .upload(`image-${values.title}-${id}.mp3`, imgFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imgError) {
        setIsLoading(false);
        toast.error('Image upload failed!');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          title: values.title,
          author: values.author,
          image_path: imgData?.path,
          song_path: songData?.path,
          user_id: user.id,
        });

      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message);
      }

      router.refresh();
      toast.success('Song uploaded successfully!');
      reset();
      onClose();
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Upload song"
      description="Upload a song (.mp3) to your library"
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file in .mp3 extension</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register('song', { required: true })}
            placeholder="Song"
            accept=".mp3"
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register('image', { required: true })}
            placeholder="Image"
            accept="image/*"
          />
        </div>
        <button
          className="w-full rounded-full bg-green-600 py-2 text-white disabled:bg-green-300"
          disabled={isLoading}
          type="submit"
        >
          Upload
        </button>
      </form>
    </Modal>
  );
};
export default UploadModal;
