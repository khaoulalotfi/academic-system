import { CertType, ICertType } from "@/models/cert-type-model";
import { connectMongoose } from "@/utils/mongoose-client";

export class CertTypeService {
  async getAll(): Promise<ICertType[]> {
    await connectMongoose();
    const certTypes = await CertType.find();
    return certTypes;
  }
}
