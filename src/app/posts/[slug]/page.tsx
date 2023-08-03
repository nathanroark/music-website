import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "../../../server/getPostMetadata";
import Image from "next/image";

const getPostContent = (slug: string) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const createGenreList = (data: any) => {
  const genres = data.genres;
  const components: React.JSX.Element[] = [];
  genres.forEach((e: any) => {
    components.push(
      <h4
        className="text-lg text-white text-opacity-50 font-bold pl-2"
        key={data.artist + "-" + data.album + "-" + e}
      >
        {e}
      </h4>
    );
  });
  return components;
};

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div className="pt-[3rem]">
      <div className="fixed bg-black p-3 w-full h-[12rem] lg:w-1/4 lg:h-screen lg:max-w-xs flex flex-col justify-between">
        <div className="flex flex-row justify-evenly items-center lg:justify-normal lg:flex-col gap-4 h-[12rem] pb-5 w-full">
          <Image
            src={post.data.cover_art_url}
            alt=""
            width={256}
            height={256}
            className="h-full w-fit lg:h-fit lg:w-full pr-2"
          />
          <div
            className="text-base sm:text-[2rem] lg:text-[1.2rem] 
                font-bold text-white flex flex-col justify-evenly gap-4"
          >
            <h3 className="max-w-lg">{post.data.album}</h3>
            <h2 className="text-opacity-75 text-white">{post.data.artist}</h2>
            <h4 className="text-sm text-white text-opacity-50 font-bold">
              {post.data.release_date}
            </h4>
          </div>
        </div>
        <div className="pb-16 pl-4 invisible lg:visible">
          <div className="text-2xl text-white text-opacity-75 font-bold">
            Genres:{" "}
          </div>
          {createGenreList(post.data)}
        </div>
      </div>
      <div className="flex justify-center pt-[12rem] lg:w-3/4 lg:float-right lg:pt-[0rem] px-2 ">
        <article className="prose prose-invert md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl">
          <Markdown>{post.content}</Markdown>
        </article>
      </div>
    </div>
  );
};

export default PostPage;
