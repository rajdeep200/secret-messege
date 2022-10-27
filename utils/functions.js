import jwt from "jsonwebtoken";

export const makeUserId = (username) => {
  return (
    username.toString().slice(0, 3).replace(/\s/g, "") +
    Math.random().toString().slice(2, 8)
  );
};

export const makeUserPassword = () => {
    return Math.random().toString(36).slice(2, 10);
}

export const generateToken = (id) => {
  return jwt.sign({ id }, "rajdeep", { expiresIn: "7d" });
};

