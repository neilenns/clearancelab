import mongoose, { Schema, Document, Model } from "mongoose";
import { logger } from "../lib/logger.js";
import { getAuth0ManagementClient } from "../lib/auth0.js";

const log = logger.child({ service: "auth0user" });

export interface Auth0User extends Document {
  colorMode: string;
  email: string;
  isPending: boolean;
  roles: string[];
  sub: string;
}

// Static method interface
export interface Auth0UserModelType extends Model<Auth0User> {
  findOrCreate(sub: string): Promise<Auth0User | null>;
}

const Auth0UserSchema = new Schema<Auth0User, Auth0UserModelType>({
  colorMode: { type: String, required: false, default: "light" },
  email: { type: String, required: true },
  isPending: { type: Boolean, required: true, default: true },
  roles: { type: [String], required: true, default: [] },
  sub: { type: String, required: true, unique: true },
});

Auth0UserSchema.statics.findOrCreate = async function (
  sub: string
): Promise<Auth0User | null> {
  const existingUser = await this.findOne({ sub });

  if (existingUser) {
    return existingUser;
  }

  try {
    const result = await getAuth0ManagementClient().users.get({ id: sub });

    const newUser = await this.create({
      sub,
      email: result.data.email,
      isPending: true,
    });

    log.debug(`Stored new user ${sub}`);

    return newUser;
  } catch (error) {
    log.error(`Error fetching user from Auth0: ${error as Error}`);
    return null;
  }
};

export const Auth0UserModel = mongoose.model<Auth0User, Auth0UserModelType>(
  "Auth0User",
  Auth0UserSchema
);
