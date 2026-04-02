import { IProgramme, Programme } from "@/models/programme-model";
import { connectMongoose } from "@/utils/mongoose-client";
import { Types } from "mongoose";

export class ProgrammeSubjectService {
  async getSubjects(programmeId: string): Promise<IProgramme[]> {
    await connectMongoose();

    const programmeSubjects = await Programme.aggregate<IProgramme>([
      {
        $match: { _id: new Types.ObjectId(programmeId) },
      },
      {
        $lookup: {
          from: "programme_subjects",
          localField: "_id",
          foreignField: "programmeId",
          as: "programmeSubjects",
        },
      },
      {
        $unwind: {
          path: "$programmeSubjects",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "programmeSubjects.subjectId",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $unwind: "$subject",
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          subjects: {
            $push: {
              _id: "$subject._id",
              title: "$subject.title",
            },
          },
        },
      },
    ]);

    return programmeSubjects;
  }
}
