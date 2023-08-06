import fs from "fs";
import matter from "gray-matter";
import PostMetadata from "../app/types";

function getPostMetadata(searchParams: {
  [key: string]: string | undefined;
}={}): PostMetadata[] {
  const sortMethod = searchParams?.sort || "";
  const filterMethod = searchParams?.filterMethod || "";
  const filters = searchParams?.filters || "";

  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Get gray-matter data from each file.
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      artist: matterResult.data.artist,
      album: matterResult.data.album,
      release_date: matterResult.data.release_date,
      post_date: matterResult.data.post_date,
      genres: matterResult.data.genres,
      cover_art_url: matterResult.data.cover_art_url,
      slug: fileName.replace(".md", ""),
    };
  });

  // Sort posts by release date.
  switch (sortMethod) {
    case "release_date": {
      posts.sort((a, b) => (a.release_date < b.release_date ? 1 : -1));
      break;
    }
    case "release_date_reverse": {
      posts.sort((a, b) => (a.release_date > b.release_date ? 1 : -1));
      break;
    }
    case "artist_alphabetical": {
      posts.sort((a, b) => {
        let artistA = a.artist.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        let artistB = b.artist.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return artistA > artistB ? 1 : -1;
      });
        break;
    }
    case "artist_reverse_alphabetical": {
      posts.sort((a, b) => {
        let artistA = a.artist.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        let artistB = b.artist.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        return artistA < artistB ? 1 : -1;
      });
      break;
    }
    default: {
      posts.sort((a, b) => (a.post_date < b.post_date ? 1 : -1));
      break;
    }
  }

  const currentFilters = filters.split(",").filter((filter) => filter !== "");
  console.log("getPostMetadata.ts: currentFilters: ", currentFilters);

  // Filter posts by genre.
  if (filters.length === 0 || !filters) {
    console.log("No filters.");
    return posts;
  }
  // Filter for posts that have all genres in the current filters.
  if (filterMethod === "every") {
    return posts.filter((post) =>
      currentFilters.every((filter) => post.genres.includes(filter))
    );
  }

  // Filter for posts that have at least one genre in common with the current filters.
  if (filterMethod === "some" || filterMethod === "") {
    return posts.filter((post) =>
      post.genres.some((genre: string) => currentFilters.includes(genre))
    );
  }

  // Problem...
  return [
    {
      artist: "ERROR",
      album: "THERE IS A PROBLEM",
      release_date: "WITH YOUR FILTERS",
      post_date: "PLEASE TRY AGAIN",
      genres: ["ERROR"],
      cover_art_url: "/ERROR",
      slug: "ERROR",
    },
  ];
}

export default getPostMetadata;
