import { auth } from "@/utils/auth";
import { signOutAction } from "@/actions/signout-action";
import { headers } from "next/headers";

export async function AuthNav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ul className="grid grid-flow-col w-fit gap-x-2">
      {!session ? (
        <>
          <li>
            <a className="text-sm text-orange-700" href="/signup">
              Sign Up
            </a>
          </li>
          <li>
            <a className="text-sm text-orange-700" href="/signin">
              Sign In
            </a>
          </li>
        </>
      ) : null}
      {session ? (
        <>
          <li>
            <span className="text-sm text-orange-700">
              {session?.user ? session?.user?.name : ""}
            </span>
          </li>
          <li>
            <form action={signOutAction}>
              <button
                className="text-sm text-orange-700 hover:underline cursor-pointer"
                type="submit"
              >
                Sign Out
              </button>
            </form>
          </li>
        </>
      ) : null}
    </ul>
  );
}
