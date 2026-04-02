import { Certificate, ICertificate } from "@/models/certificate-model";
import { connectMongoose } from "@/utils/mongoose-client";
import { Types } from "mongoose";

export class CertificateService {
  async getCertificates(): Promise<ICertificate[]> {
    await connectMongoose();
    const certificates = await Certificate.find().sort({ company: 1 });
    return certificates;
  }

  async saveCertificate(certificate: ICertificate): Promise<void> {
    await connectMongoose();
    await Certificate.create(certificate);
  }

  async updateCertificate(certificate: ICertificate): Promise<void> {
    await connectMongoose();
    const id = certificate.id ?? "";
    delete certificate.id;
    await Certificate.updateOne({ _id: new Types.ObjectId(id) }, certificate);
  }

  async deleteCertificate(id: string): Promise<void> {
    await connectMongoose();
    await Certificate.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
