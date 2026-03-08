import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDB } from "../src/db";
import { User } from "../src/modules/user/user.model";
import { normalizeRoles } from "../src/modules/auth/auth.policy";

async function main() {
  const name = process.env.ADMIN_NAME?.trim() || "Admin User";
  const email = (process.env.ADMIN_EMAIL?.trim() || "admin@studybird.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim() || "Admin@12345";
  const roles = normalizeRoles(["admin"]);

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        name,
        email,
        passwordHash,
        roles,
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).exec();

  if (!user) {
    throw new Error("Failed to create or update admin user");
  }

  console.log("Admin user ready:");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Roles: ${roles.join(", ")}`);

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Failed to create admin user:", error);
  await mongoose.disconnect();
  process.exit(1);
});

