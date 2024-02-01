'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  children: React.ReactNode;
  userSongs: Song[];
}

// children needed here for passing server components into a client component
const Sidebar: React.FC<SidebarProps> = ({ children, userSongs }) => {
  const pathName = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      { name: 'Home', icon: HiHome, href: '/', current: pathName !== 'search' },
      {
        name: 'Search',
        icon: BiSearch,
        href: '/search',
        current: pathName === '/search',
      },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        'flex h-full',
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.name} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library userSongs={userSongs} />
        </Box>
      </div>
      <main className="h-full flex-1 w-full overflow-y-auto py-2">
        {' '}
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
