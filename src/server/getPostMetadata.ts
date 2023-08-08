import fs from "fs";
import matter from "gray-matter";

function getPostMetadata() {
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

  return posts;
}

export default getPostMetadata;
