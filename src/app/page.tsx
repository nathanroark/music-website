import Footer from "@/components/Footer";
import PostPreview from "../components/PostPreview";
import getSearchedPosts from "@/server/getSearchedPosts";
import Sidebar from "@/components/Sidebar";

function NoAlbumsFound() {
  // TODO: Make this look better
  return (
    <div className="flex justify-center items-center flex-col pt-[3rem] pl-[14rem]">
      <div className="flex justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col justify-center items-center gap-2 p-32">
            <h1 className="text-2xl text-white font-bold">No results found</h1>
            <p className="text-lg text-white">Try a different filter</p>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const sortMethod = searchParams?.sort || "";
  const filterMethod = searchParams?.filterMethod || "";
  const filters = searchParams?.filters || "";

  const postMetadata = getSearchedPosts(sortMethod, filterMethod, filters);
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  if (postPreviews.length === 0) {
    return <NoAlbumsFound />;
  }

  return (
    <>
      <Sidebar />
      <div className="flex justify-center items-center flex-col pt-[3rem] sm:pl-[14rem]">
        <div className="flex justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {postPreviews}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
