'use client';

import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  name: string;
  image: StaticImageData;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };

  return (
    // Take a look on a group here
    <button
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
      onClick={onClick}
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      {/* Take a look on a group here */}
      <div
        className="
          absolute
          transition
          opacity-0
          rounded-full
          flex
          items-center
          justify-center
          bg-green-500
          p-4
          drop-shadow-md
          right-5
          group-hover:opacity-100
          hover:scale-110
        "
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
