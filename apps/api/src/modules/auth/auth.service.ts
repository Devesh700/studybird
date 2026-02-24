import bcrypt from "bcrypt";
import { AppError } from "./auth.error";
import { signAccessToken } from "./auth.token";
import { User } from "../user/user.model";
import { createUser } from "../user/user.service";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

function toAuthUser(user: any) {
  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    roles: user.roles ?? [],
  };
}

function createAuthResponse(user: any) {
  const authUser = toAuthUser(user);
  const accessToken = signAccessToken({
    sub: authUser._id,
    email: authUser.email,
    roles: authUser.roles,
  });
  return { user: authUser, accessToken };
}

export async function register(input: RegisterInput) {
  const user = await createUser({
    name: input.name,
    email: input.email,
    password: input.password,
    roles: ["user"],
  });

  return createAuthResponse(user);
}

export async function login(input: LoginInput) {
  const email = input.email.toLowerCase().trim();
  const user = await User.findOne({ email }).select("+passwordHash").exec();
  if (!user || user.isDeleted) throw new AppError(401, "Invalid email or password");

  const match = await bcrypt.compare(input.password, (user as any).passwordHash);
  if (!match) throw new AppError(401, "Invalid email or password");

  user.lastLoginAt = new Date();
  await user.save();

  return createAuthResponse(user);
}
