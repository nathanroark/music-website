import fs from "fs";
import matter from "gray-matter";
import PostMetadata from "../components/PostMetadata";

const getPostMetadata = (sortMethod: string): PostMetadata[] => {
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
            genres: matterResult.data.genres,
            cover_art_url: matterResult.data.cover_art_url,
            slug: fileName.replace(".md", ""),
        };
    });

    // Sort posts by release date.
    if (sortMethod === "release_date") {
        posts.sort((a, b) => {
            if (a.release_date < b.release_date) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    return posts;
};

export default getPostMetadata;
