import { connectMongoose } from "@/utils/mongoose-client";
import { IUser, User } from "@/models/user-model";

export class UserService {
  async getUsers(): Promise<IUser[]> {
    await connectMongoose();
    const users = await User.find().sort({ createdAt: -1 });
    return users.map((u) => u.toJSON() as IUser);
  }
}
