import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
  name: string;
  href: string;
  icon: IconType;
  current: boolean;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  href,
  icon: Icon,
  current,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex flex-row items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1',
        current && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{name}</p>
    </Link>
  );
};

export default SidebarItem;
