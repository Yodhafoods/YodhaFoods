import jwt from "jsonwebtoken";

export const createEmailVerifyToken = (userId: string, email: string) => {
  return jwt.sign(
    { sub: userId, email },
    process.env.EMAIL_VERIFY_SECRET!,
    { expiresIn: "10m" } // 10 minutes
  );
};

export const verifyEmailToken = (token: string) => {
  return jwt.verify(token, process.env.EMAIL_VERIFY_SECRET!) as {
    sub: string;
    email: string;
  };
};
