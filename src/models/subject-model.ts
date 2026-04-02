import { model, models, Schema, Model, Types } from "mongoose";
import { WithStringId } from "./model-t";

export interface ISubject {
  id: string;
  title: string;
}

type IReturnType = WithStringId<ISubject>;

const SubjectSchema = new Schema<ISubject>(
  {
    title: String,
  },
  {
    timestamps: false,
    collection: "subjects",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ISubject & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id.toString() };
      },
    },
  },
);

export const Subject: Model<ISubject> =
  models.Subject || model("Subject", SubjectSchema);
