import { model, models, Schema, Model, Types } from "mongoose";
import { WithStringId } from "./model-t";

export interface IGroupStudent {
  id: string;
  firstName: string;
  lastName: string;
  groupId: string;
}

type IReturnType = WithStringId<IGroupStudent>;

const GroupStudentSchema = new Schema<IGroupStudent>(
  {
    firstName: String,
    lastName: String,
    groupId: String,
  },
  {
    timestamps: false,
    collection: "group_students",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IGroupStudent & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id.toString() };
      },
    },
  },
);

export const GroupStudent: Model<IGroupStudent> =
  models.GroupStudent || model("GroupStudent", GroupStudentSchema);
