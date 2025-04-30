import mongoose, { Schema, Document, Model } from "mongoose";
import { ManagementClient } from "auth0";
import { ENV } from "../lib/env.js";
import { logger } from "../lib/logger.js";

const log = logger.child({ service: "auth0user" });

interface Auth0User extends Document {
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

  const management = new ManagementClient({
    domain: ENV.AUTH0_DOMAIN,
    clientId: ENV.AUTH0_CLIENT_ID,
    clientSecret: ENV.AUTH0_CLIENT_SECRET,
  });

  try {
    const result = await management.users.get({ id: sub });

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

export const Auth0UserModel: Model<Auth0User> = mongoose.model<
  Auth0User,
  Auth0UserModelType
>("Auth0User", Auth0UserSchema);
