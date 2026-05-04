import { connectMongoose } from "@/utils/mongoose-client";
import { GroupStudent, IGroupStudent } from "@/models/group-student-model";
import { Types } from "mongoose";

export class GroupStudentService {
  async getStudentsByGroup(groupId: string): Promise<IGroupStudent[]> {
    await connectMongoose();
    const students = await GroupStudent.find({ groupId }).sort({ lastName: 1 });
    return students.map((s) => s.toJSON() as IGroupStudent);
  }

  async deleteStudent(id: string): Promise<void> {
    await connectMongoose();
    await GroupStudent.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
