"use client";

import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Spinner /> Loading...
        </>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
