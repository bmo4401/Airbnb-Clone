'use client';

import Image from 'next/image';
import defaultImg from '../../../public/images/placeholder.jpg';
interface AvatarProps {
   src: string | undefined | null;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
   return (
      <Image
         className="rounded-full"
         height={30}
         width={30}
         alt="Avatar"
         src={src || defaultImg}
      />
   );
};
export default Avatar;
