import { connectMongoose } from "@/utils/mongoose-client";
import { Group, IGroup } from "@/models/group-model";

export class GroupService {
  async getGroups(): Promise<IGroup[]> {
    await connectMongoose();
    const groups = await Group.find().sort({ name: 1 });
    return groups.map((g) => g.toJSON() as IGroup);
  }
}
