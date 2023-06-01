export const getPostById = async (id) => {
  try {
    const response = await fetch(`/api/posts/${id}`);
    const post = await response.json();
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  const response = await fetch("/api/posts");
  const responseData = await response.json();

  return responseData;
};

export const getUser = async (uId) => {
  const response = await fetch(`/api/users/${uId}`);
  const responseData = await response.json();

  return responseData;
};
