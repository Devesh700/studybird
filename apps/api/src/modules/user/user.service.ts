import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { AppError } from "../auth/auth.error";
import { normalizeRoles } from "../auth/auth.policy";
import { User } from "./user.model";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  roles?: string[];
};

type UpdateUserInput = {
  name?: string;
  email?: string;
  password?: string;
  roles?: string[];
};

function toPublicUser(user: any) {
  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    roles: user.roles ?? [],
    isDeleted: Boolean(user.isDeleted),
    deletedAt: user.deletedAt ?? null,
    deletedBy: user.deletedBy ? String(user.deletedBy) : null,
    createdBy: user.createdBy ? String(user.createdBy) : null,
    lastLoginAt: user.lastLoginAt ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function createUser(input: CreateUserInput, actorId?: string) {
  const email = input.email.toLowerCase().trim();
  const existing = await User.findOne({ email }).lean().exec();
  if (existing) throw new AppError(409, "Email already in use");

  const passwordHash = await bcrypt.hash(input.password, 10);
  const roles = normalizeRoles(input.roles);

  const user = await User.create({
    name: input.name.trim(),
    email,
    passwordHash,
    roles,
    createdBy: actorId && Types.ObjectId.isValid(actorId) ? new Types.ObjectId(actorId) : null,
  });

  return toPublicUser(user);
}

export async function updateUserById(id: string, input: UpdateUserInput) {
  if (!Types.ObjectId.isValid(id)) throw new AppError(400, "Invalid user id");

  const update: Record<string, unknown> = {};
  if (input.name !== undefined) update.name = input.name.trim();

  if (input.email !== undefined) {
    const email = input.email.toLowerCase().trim();
    const existing = await User.findOne({ email, _id: { $ne: id } }).lean().exec();
    if (existing) throw new AppError(409, "Email already in use");
    update.email = email;
  }

  if (input.password !== undefined) {
    update.passwordHash = await bcrypt.hash(input.password, 10);
  }

  if (input.roles !== undefined) {
    update.roles = normalizeRoles(input.roles);
  }

  const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, update, { new: true }).exec();
  if (!user) throw new AppError(404, "User not found");

  return toPublicUser(user);
}

export async function softDeleteUserById(id: string, actorId: string) {
  if (!Types.ObjectId.isValid(id)) throw new AppError(400, "Invalid user id");

  const user = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: Types.ObjectId.isValid(actorId) ? new Types.ObjectId(actorId) : null,
    },
    { new: true }
  ).exec();

  if (!user) throw new AppError(404, "User not found");
  return toPublicUser(user);
}

export async function hardDeleteUserById(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new AppError(400, "Invalid user id");

  const deleted = await User.findByIdAndDelete(id).exec();
  if (!deleted) throw new AppError(404, "User not found");
  return { ok: true };
}

export async function getUserById(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new AppError(400, "Invalid user id");
  const user = await User.findById(id).lean().exec();
  if (!user) throw new AppError(404, "User not found");
  return toPublicUser(user);
}
