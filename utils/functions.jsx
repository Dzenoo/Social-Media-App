export const getPosts = async () => {
  const response = await fetch("/api/posts");
  const responseData = await response.json();

  return responseData;
};
