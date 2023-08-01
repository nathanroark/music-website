import Footer from '@/components/Footer';
import getPostMetadata from '../components/getPostMetadata';
import PostPreview from '../components/PostPreview';
import SortBar from '@/components/SortBar';
export default function Home({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {
  const sortMethod = searchParams?.sort || '';
  const postMetadata = getPostMetadata(sortMethod);
  const postPreviews = postMetadata.map((post) => <PostPreview key={post.slug} {...post} />);


  // TODO: Add Brave Bird
  // TODO: Add Chelseas Wierd

  return (
    <div className="flex justify-center items-center flex-col pt-[3rem]">
      <SortBar />
      <div className="flex justify-center">
        <div className="max-w-7xl container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid gap-2 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {postPreviews}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
