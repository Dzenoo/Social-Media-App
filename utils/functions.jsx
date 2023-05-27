export const getPostById = async (id) => {
  const response = await fetch(`/api/posts/${id}`);
  const post = await response.json();

  return post;
};
