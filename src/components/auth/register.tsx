"use client";

import { signUpAction } from "@/actions/signup-action";
import { SubmitButton } from "@/components/parts/submit-button";
import { TextField } from "@/components/parts/text-field";
import { registerDto } from "@/dto/register-dto";
import { IState } from "@/types/shared-t";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export function Register() {
  const [state, formAction] = useActionState<IState, FormData>(
    signUpAction,
    registerDto,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.isSaved) {
      router.push("/");
    }
  }, [state.isSaved, router]);

  return (
    <form className="space-y-12 w-full sm:w-96" action={formAction}>
      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="Email"
          name="email"
          isRequired={true}
          type="email"
          errors={state.errors?.email}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="Name"
          name="username"
          isRequired={true}
          errors={state.errors?.username}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <TextField
          label="Password"
          name="password"
          isRequired={true}
          type="password"
          errors={state.errors?.password}
        />
      </div>
      <div className="w-full">
        <SubmitButton name="Register" />
      </div>
      <div
        className={`my-2 text-sm italic p-1 ${
          state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""
        }`}
      >
        {state?.message}
      </div>
    </form>
  );
}
