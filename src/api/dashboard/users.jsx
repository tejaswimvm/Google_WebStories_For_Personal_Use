export const getCurrentUser = async (id) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};
  console.log("user", user);
  return user ? user : {};
};
