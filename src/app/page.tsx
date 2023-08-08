import Footer from "@/components/Footer";
import PostPreview from "../components/PostPreview";
import getPostMetadata from "@/server/getPostMetadata";

export default function Home() {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  return (
    <div className="flex justify-center items-center flex-col pt-[3rem]">
      <div className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {postPreviews}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
