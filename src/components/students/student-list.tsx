"use client";
import { IGroup } from "@/models/group-model";
import { IGroupStudent } from "@/models/group-student-model";
import { useState } from "react";

type IProps = {
  groups: IGroup[];
};

export function StudentList({ groups }: IProps) {
  const [students, setStudents] = useState<IGroupStudent[]>();

  const handleGroupClick = async (groupId: string) => {
    if (!groupId) {
      setStudents(undefined);
      return;
    }
    const res = await fetch(`/api/group-students/${groupId}`);
    const data = await res.json();
    setStudents(data);
  };

  const handleDelete = async (studentId: string, groupId: string) => {
    await fetch(`/api/group-students/${studentId}`, { method: "DELETE" });
    const res = await fetch(`/api/group-students/${groupId}`);
    const data = await res.json();
    setStudents(data);
  };

  return (
    <div className="grid gap-y-5">
      <div>
        <label
          htmlFor="group"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Group Name
        </label>
        <select
          id="group"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xs p-2"
          defaultValue=""
          onChange={(e) => handleGroupClick(e.target.value)}
        >
          <option value=""></option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {students && (
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                  No students in this group
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{student.firstName}</td>
                  <td className="px-4 py-3">{student.lastName}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(student.id, student.groupId)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
