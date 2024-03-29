'use client';

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { useEffect } from 'react';

interface AuthModalProps {}

const AuthModal: React.FC<AuthModalProps> = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  const router = useRouter();

  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        // here we can pass in any strings to localize inputs see in types of prop
        // localization={{ variables: { sign_in: { } } }}
        theme="dark"
        providers={['github', 'google', 'discord', 'spotify']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#404040', brandAccent: '#22c55e' } },
          },
        }}
      />
    </Modal>
  );
};
export default AuthModal;
