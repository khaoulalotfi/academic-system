import { ProgrammeSubjectService } from "@/services/programme-subject-service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const programmeId = searchParams.get("programmeId");
  if (!programmeId) {
    return new Response("Not found programmeId", { status: 400 });
  }
  const programmeSubjectService = new ProgrammeSubjectService();
  const subjects = await programmeSubjectService.getSubjects(programmeId);
  return Response.json(subjects);
}
