import posts from "../data/data.json";

export const getPosts = async () => {
  return posts.posts;
};

export const getPostById = async (id) => {
  const posts = await getPosts();

  const currentPost = posts.find((p) => p.id === id);
  return currentPost;
};
