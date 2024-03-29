'use client';

import { Toaster } from 'react-hot-toast';

interface Props {}
const ToasterProvider = (props: Props) => {
  return (
    <Toaster
      toastOptions={{
        duration: 3000,
        style: { background: '#333', color: '#fff' },
      }}
    />
  );
};
export default ToasterProvider;
