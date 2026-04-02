import { model, models, Schema, Model, Types } from "mongoose";
import { WithStringId } from "./model-t";

export interface ICertType {
  id: string;
  title: string;
}

type IReturnType = WithStringId<ICertType>;

const CertTypeSchema = new Schema<ICertType>(
  { title: String },
  {
    timestamps: false,
    collection: "cert_types",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ICertType & { _id: Types.ObjectId },
      ): IReturnType => {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id.toString() };
      },
    },
  },
);

export const CertType: Model<ICertType> =
  models.CertType || model("CertType", CertTypeSchema);
