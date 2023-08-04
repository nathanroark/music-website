'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Menu, Transition, Combobox } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon, ChevronUpDownIcon  } from '@heroicons/react/20/solid';
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

  const genreList = [
    'Midwest Emo',
    'Screamo',
    'Shoegaze',
    'Math Rock',
    'Post Hardcore',
    'Post Rock',
    'Indie Rock',
  ];

  const appliedFilters = genreList.filter((genre) => currentFilters.includes(genre));

  const availableFilters = genreList.filter((genre) => !currentFilters.includes(genre));

  return (
    <div className="fixed top-0 left-0 w-[14rem] p-4 flex flex-col gap-10 bg-black border-r border-zinc-600 pt-[3rem] h-screen mt-2 rounded-md">
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Sort Method</h2>
        <SortMethodCombobox />
        {/* <div className="flex flex-col gap-1">
          {sortItems.map((item, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: '/',
                  query: {
                    sort: item.query,
                    filters: filters,
                    filterMethod: filterMethod,
                  },
                }}
                className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2"
              >
                <span className="relative">
                  {item.query === sortMethod ? (
                    <span className=" text-green-400">{item.name}</span>
                  ) : (
                    <span className="text-zinc-100">{item.name}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </div> */}
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
                className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2"
              >
                <span className="relative ">
                  {item === filterMethod ? (
                    <span className=" text-green-400">{item}</span>
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
        <h2 className="text-2xl text-zinc-100 font-bold mb-2">Genres</h2>
    
        <div className="flex flex-col gap-1">
          {appliedFilters.map((name, index) => {
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
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2 group"
                >
                  <span className="relative ">
                    <span className="text-zinc-300 group-hover:line-through group-hover:text-red-500">
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


const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

  function SortMethodCombobox() {
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none 
          focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person:any) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 
            ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
  )
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
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold shadow-sm ring-1 
        ring-inset ring-gray-300 hover:bg-black text-zinc-200"
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
        <Menu.Items className="absolute right-0  mt-2 w-5/6 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
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
                        active ? 'bg-black text-green-400' : 'text-zinc-200',
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
