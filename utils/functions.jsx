export const getPostById = async (id) => {
  const response = await fetch(`/api/posts/${id}`, {
    cache: "default",
    next: { revalidate: 2 },
  });
  const post = await response.json();

  return post;
};

export const getPosts = async () => {
  const response = await fetch("/api/posts");
  const responseData = await response.json();

  return responseData;
};

export const getUser = async (uId) => {
  const response = await fetch(`/api/users/${uId}`, { cache: "no-store" });
  const responseData = await response.json();

  return responseData;
};
