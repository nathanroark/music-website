import Link from 'next/link';
const SortBar = ({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) => {
  const sortMethod = searchParams?.sort || '';
  return (
    <div className='absolute top-0 left-0 w-fit p-4 bg-black border-r border-zinc-600 pt-[3rem] h-screen mt-2 rounded-md'>
      <h3 className='text-2xl font-bold text-gray-200 underline'>Sort By</h3>
      <ul className='flex flex-col gap-2'>
        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
          <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
        </div>
        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
          <input id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
        </div>
        <li>
          <Link
            href={{
              pathname: "/",
              query: { sort: "artist a-z" }
            }}
            className='flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700'
          >
            <input id="bordered-radio-1" type="radio" checked value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">A - Z</label>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: "/",
              query: { sort: "release_date" }
            }}
            className='p-2 m-2 bg-emerald-700 text-lg font-medium text-gray-950 rounded-md'
          >
            Release Date
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SortBar;
