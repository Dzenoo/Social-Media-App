import Image from "next/image";
import Link from "next/link";

const SavedPost = ({ image }) => {
  return (
    <Link href="/">
      <Image src={image} width={400} height={400} alt="savedpost" />
    </Link>
  );
};

export default SavedPost;
