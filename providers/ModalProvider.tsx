'use client';

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import { useEffect, useState } from 'react';

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // if component is mounted so we are in client component
    // so we can render the modal
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal></UploadModal>
    </>
  );
};
export default ModalProvider;
