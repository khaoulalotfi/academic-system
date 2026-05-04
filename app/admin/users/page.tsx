import { UserService } from "@/services/user-service";

export default async function AdminUsersPage() {
  const userService = new UserService();
  const users = await userService.getUsers();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role ?? "user"}</td>
              <td className="px-4 py-3">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
