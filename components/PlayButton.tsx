import { FaPlay } from 'react-icons/fa';
import Button from './Button';

interface PlayButtonProps {}
const PlayButton: React.FC<PlayButtonProps> = () => {
  return (
    <Button
      className="opacity-0 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
      onClick={() => {}}
    >
      <FaPlay className="text-black" />
    </Button>
  );
};
export default PlayButton;
