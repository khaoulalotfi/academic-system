import { GroupStudentService } from "@/services/group-student-service";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const service = new GroupStudentService();
  const students = await service.getStudentsByGroup(groupId);
  return Response.json(students);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId: studentId } = await params;
  const service = new GroupStudentService();
  await service.deleteStudent(studentId);
  return Response.json({ message: "Student deleted successfully" });
}
