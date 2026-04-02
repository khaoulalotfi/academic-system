import { CertTypeService } from "@/services/cert-type-service";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const certTypeService = new CertTypeService();
  const certTypes = await certTypeService.getAll();
  return Response.json(certTypes);
}
