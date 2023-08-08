import Link from "next/link";
import Image from "next/image";
import type PostMetadata from "../app/types";

// w-[10rem] sm:w=[15rem] md:w-[17rem] xl:w-[20rem
const PostPreview = (props: PostMetadata) => {
  return (
    <Link
      className="group flex flex-col justify-between bg-[#1e1e1f] hover:bg-[#24242a] 
    rounded-lg text-white gap-2 lg:gap-4 p-2 lg:p-3 hover:scale-105 transform transition-all duration-300 ease-in-out"
      href={`/posts/${props.slug}`}
    >
      <div className="overflow-hidden">
        <Image
          src={props.cover_art_url}
          alt=""
          width={512}
          height={512}
          priority
          className="relative transform transition-all duration-500 ease-in-out"
        />
      </div>
      <div className="text-[0.7rem] sm:text-[0.8rem] xl:text-[0.9rem] 2xl:text-[1rem] font-bold gap-2 p-2">
        <h3 className="py-1 truncate">{props.album}</h3>
        <h4 className="text-opacity-50 text-white">{props.artist}</h4>
      </div>
    </Link>
  );
};

export default PostPreview;
