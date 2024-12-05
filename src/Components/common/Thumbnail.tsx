import { getUserThumbnail } from "./createThumbnail";

interface ThumbnailProps {
    name: string;
    bgColor: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ name, bgColor }) => {
  return (
    <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full"
        style={{ backgroundColor: bgColor }}
    >
      {getUserThumbnail(name)}
    </div>
  );
};

export default Thumbnail;
