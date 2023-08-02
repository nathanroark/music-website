import Link from 'next/link';

const SortBar = ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  console.log('searchParams', searchParams);
  const sortMethod = searchParams?.sort || '';
  const SortItems = [
    {
      name: 'Post Date',
      query: '',
    },
    {
      name: 'Artist A to Z',
      query: 'artist_a-z',
    },
    {
      name: 'Artist Z to A',
      query: 'artists_z-a',
    },
    {
      name: 'Release Date',
      query: 'release_date',
    },
    {
      name: 'Reverse Release Date',
      query: 'release_date_reverse',
    },
  ];

  return (
    <div className="absolute top-0 left-0 w-[14rem] p-4 bg-black border-r border-zinc-600 pt-[3rem] h-screen mt-2 rounded-md">
      {SortItems.map((item, index) => {
        return (
          <Link
            key={index}
            href={{
              pathname: '/',
              query: { sort: item.query },
            }}
            className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2"
          >
            <span className="relative">
              {item.query === sortMethod ? (
                <span className="ml-2 text-green-400">{item.name}</span>
              ) : (
                <span className="ml-2 text-zinc-100">{item.name}</span>
              )}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default SortBar;
