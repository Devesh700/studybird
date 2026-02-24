import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    roles: { type: [String], default: ["user"], index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export type UserDoc = {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  isDeleted: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;
  createdBy: string | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const User = models.User || model("User", UserSchema);
