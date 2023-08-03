"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const Sidebar = () => {
  let pathname = usePathname() || "/";
  if (pathname != "/") {
    return null;
  }
  const searchParams = useSearchParams();
  const sortMethod = searchParams.get("sort") || "";
  const filterMethod = searchParams.get("filterMethod") || "";

  const filters: string = searchParams.get("filters") || "";

  const currentFilters = filters.split(",").filter((filter) => filter !== "");
  console.log("Sidebar -> currentFilters", currentFilters);
  const SortItems = [
    {
      name: "Post Date",
      query: "",
    },
    {
      name: "Artist A to Z",
      query: "artist_alphabetical",
    },
    {
      name: "Artist Z to A",
      query: "artist_reverse_alphabetical",
    },
    {
      name: "Release Date",
      query: "release_date",
    },
    {
      name: "Reverse Release Date",
      query: "release_date_reverse",
    },
  ];

  const FilterMethods = ["some", "every"];

  const genreList = [
    "Midwest Emo",
    "Screamo",
    "Shoegaze",
    "Math Rock",
    "Post Hardcore",
    "Post Rock",
    "Indie Rock",
  ];

  const appliedFilters = genreList.filter((genre) =>
    currentFilters.includes(genre)
  );

  const availableFilters = genreList.filter(
    (genre) => !currentFilters.includes(genre)
  );

  return (
    <div className="fixed top-0 left-0 w-[14rem] p-4 flex flex-col gap-10 bg-black border-r border-zinc-600 pt-[3rem] h-screen mt-2 rounded-md">
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Sort Method</h2>
        {SortItems.map((item, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: "/",
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
      </div>
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Filter Method</h2>
        <div className="flex gap-4">
          {FilterMethods.map((item, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: "/",
                  query: {
                    sort: sortMethod,
                    filters: filters,
                    filterMethod: item,
                  },
                }}
                className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2"
              >
                <span className="relative">
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
      <div>
        <h2 className="text-2xl text-zinc-100 font-bold mb-4">Filter</h2>
        {appliedFilters.map((name, index) => {
          return (
            <div key={name + "selected genre"}>
              <Link
                // remove a genre from the filter list
                href={{
                  pathname: "/",
                  query: {
                    sort: sortMethod,
                    filters: [...appliedFilters]
                      .filter((genre) => genre !== name)
                      .join(","),
                    filterMethod: filterMethod,
                  },
                }}
                className="w-full flex justify-center items-center bg-zinc-900  hover:bg-zinc-800 
                border border-zinc-400 rounded duration-300 ease-in-out relative py-2"
              >
                <span className="relative">
                  <span className="text-green-400">{name}</span>
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <MyDropdown
        availableFilters={availableFilters}
        sortMethod={sortMethod}
        appliedFilters={appliedFilters}
        filterMethod={filterMethod}
      />
    </div>
  );
};

function MyDropdown({
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
          Options
          <ChevronDownIcon
            className="h-5 w-5 text-gray-300"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-5/6 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableFilters.map((name, index) => {
              return (
                <Menu.Item key={name + "genre dropdown"}>
                  {({ active }) => (
                    <Link
                      href={{
                        pathname: "/",
                        query: {
                          sort: sortMethod,
                          filters: [...appliedFilters, name].join(","),
                          filterMethod: filterMethod,
                        },
                      }}
                      className={clsx(
                        active ? "bg-black text-green-400" : "text-zinc-200",
                        "block px-4 py-2 text-sm cursor-pointer text-center w-full"
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
