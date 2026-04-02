import { CertificateService } from "@/services/certificate-service";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const certificateService = new CertificateService();
  const certificates = await certificateService.getCertificates();
  return Response.json(certificates);
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  const certificateService = new CertificateService();
  await certificateService.saveCertificate(res);
  return Response.json({ message: "Data are saved" });
}
