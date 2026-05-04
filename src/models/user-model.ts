import { model, models, Schema, Model, Types } from "mongoose";
import { WithStringId } from "./model-t";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

type IReturnType = WithStringId<IUser>;

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: String,
    role: String,
    createdAt: Date,
  },
  {
    timestamps: false,
    collection: "users",
    strict: false,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IUser & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id.toString() };
      },
    },
  },
);

export const User: Model<IUser> = models.User || model("User", UserSchema);
