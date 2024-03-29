'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

const Sidebar = () => {
  const searchParams = useSearchParams();

  let pathname = usePathname() || '/';
  if (pathname != '/') {
    return null;
  }
  const sortMethod = searchParams.get('sort') || '';
  const filterMethod = searchParams.get('filterMethod') || 'some';
  const filters: string = searchParams.get('filters') || '';

  const currentFilters = filters.split(',').filter((filter) => filter !== '');

  const sortItems = [
    {
      name: 'Post Date',
      query: '',
    },
    {
      name: 'Artist A to Z',
      query: 'artist_alphabetical',
    },
    {
      name: 'Artist Z to A',
      query: 'artist_reverse_alphabetical',
    },
    {
      name: 'Release Latest',
      query: 'release_date',
    },
    {
      name: 'Release Oldest',
      query: 'release_date_reverse',
    },
  ];

  const FilterMethods = ['some', 'every'];

  // TODO: get this from the server instead of hardcoding it
  const genreList = [
    'Midwest Emo',
    'Shoegaze',
    'Indie Rock',
    'Post Hardcore',
    'Screamo',
    'J-Rock',
    'Singer Songwriter',
    'Post Rock',
    'Emo',
    'Indietronica',
    'Indie Folk',
    'Noise Pop',
    'Neo-Psychedelia',
    'Math Rock',
    'Noise Rock',
    'Psychedelic Folk',
    'Blackgaze',
    'Post Metal',
    'Experemental Rock',
    'Slowcore',
    'Sadcore',
    'Folktronica',
    'Post-Punk',
    'Drone',
    'Post-Industrial',
    'Gothic Rock',
    'Post-Hardcore',
    'Spoken Word',
    'Poetry',
    'Trip Hop',
    'Indie Pop',
    'Contemporary Folk',
    'Americana',
    'Pop Punk',
    'Advent-Folk',
    'Neo-soul',
    'Psychedelic Soul',
    'Funk',
    'Funktronica',
    'Acid Jazz',
    'Breakcore',
    'Atmospheric Drum and Bass',
    'Electronic',
  ];

  const appliedFilters = genreList.filter((genre) => currentFilters.includes(genre));

  const availableFilters = genreList.filter((genre) => !currentFilters.includes(genre));

  return (
    <div className="fixed top-0 left-0 w-[14rem] p-4 sm:flex flex-col gap-10 border-r border-zinc-600 pt-[3rem] h-screen mt-2 rounded-sm hidden">
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Sort Method</h2>
        <SortDropdown
          sortItems={sortItems}
          sortMethod={sortMethod}
          appliedFilters={appliedFilters}
          filterMethod={filterMethod}
        />
      </div>
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Filter Method</h2>
        <div className="flex gap-2 ">
          {FilterMethods.map((item, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: '/',
                  query: {
                    sort: sortMethod,
                    filters: filters,
                    filterMethod: item,
                  },
                }}
                className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 border border-zinc-400 rounded relative py-2" >
                <span className="relative ">
                  {item === filterMethod ? (
                    <span className=" text-green-500">{item}</span>
                  ) : (
                    <span className=" text-zinc-100">{item}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-zinc-100 font-bold mb-2">Genre Filters</h2>

        <div className="flex flex-col gap-1">
          {appliedFilters.map((name) => {
            return (
              <div key={name + 'selected genre'}>
                <Link
                  // remove a genre from the filter list
                  href={{
                    pathname: '/',
                    query: {
                      sort: sortMethod,
                      filters: [...appliedFilters].filter((genre) => genre !== name).join(','),
                      filterMethod: filterMethod,
                    },
                  }}
                  className="w-full flex justify-center items-center bg-zinc-900  hover:bg-black 
                border border-zinc-400 rounded-sm duration-300 ease-in-out relative py-2 group"
                >
                  <span className="relative ">
                    <span className="text-zinc-300 group-hover:line-through group-hover:text-red-600">
                      {name}
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <GenreDropdown
          availableFilters={availableFilters}
          sortMethod={sortMethod}
          appliedFilters={appliedFilters}
          filterMethod={filterMethod}
        />
      </div>
    </div>
  );
};

function SortDropdown({
  sortItems,
  sortMethod,
  appliedFilters,
  filterMethod,
}: {
  sortItems: { name: string, query: string }[];
  sortMethod: string;
  appliedFilters: string[];
  filterMethod: string;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-sm bg-zinc-900 px-3 py-2 text-sm font-semibold shadow-sm ring-1 
        ring-inset ring-gray-400 hover:bg-zinc-800 text-zinc-200"
        >
          {sortItems.find((item) => item.query === sortMethod)?.name}
          <ChevronDownIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right rounded-sm bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ring-1 ring-zinc-300">
            {sortItems.map((item, index) => {
              return (
                <Menu.Item key={item.name + 'genre dropdown'}>
                  {({ active }) => (
                    <Link
                      href={{
                        pathname: '/',
                        query: {
                          sort: item.query,
                          filters: appliedFilters.join(','),
                          filterMethod: filterMethod,
                        },
                      }}
                      className={clsx(
                        active ? ' text-green-500' : 'text-zinc-200',
                        index != 0 ? 'border-t border-zinc-600' : '',
                        'block px-4 py-2 text-sm cursor-pointer text-center w-full'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function GenreDropdown({
  availableFilters,
  sortMethod,
  appliedFilters,
  filterMethod,
}: {
  availableFilters: string[];
  sortMethod: string;
  appliedFilters: string[];
  filterMethod: string;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center gap-x-1.5 rounded-sm bg-zinc-900 px-3 py-2 text-sm font-semibold shadow-sm ring-1 
        ring-inset ring-gray-300 hover:bg-zinc-800 text-zinc-200"
        >
          Add Genres
          <ChevronDownIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 max-h-[16rem] z-10 overflow-y-scroll ring-1 ring-zinc-300  
          origin-top-right rounded-sm bg-zinc-900 focus:outline-none">
          <div className="py-1 ring-1 ring-zinc-300">
            {availableFilters.map((name, index) => {
              return (
                <Menu.Item key={name + 'genre dropdown'}>
                  {({ active }) => (
                    <Link
                      href={{
                        pathname: '/',
                        query: {
                          sort: sortMethod,
                          filters: [...appliedFilters, name].join(','),
                          filterMethod: filterMethod,
                        },
                      }}
                      className={clsx(
                        active ? ' text-green-500' : 'text-zinc-200',
                        index != 0 ? 'border-t border-zinc-600' : '',
                        'block px-4 py-2 text-sm cursor-pointer text-center w-full'
                      )}
                    >
                      {name}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Sidebar;
