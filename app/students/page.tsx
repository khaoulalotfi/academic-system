import { StudentList } from "@/components/students/student-list";
import { GroupService } from "@/services/group-service";

export default async function StudentsPage() {
  const groupService = new GroupService();
  const groups = await groupService.getGroups();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-5">Group Students</h1>
      <StudentList groups={groups} />
    </main>
  );
}
