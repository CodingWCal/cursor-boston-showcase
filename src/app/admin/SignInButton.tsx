"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      onClick={async () => {
        try {
          const result = await signIn("github", { callbackUrl: "/admin" });
          if (result?.error) {
            console.error("Sign in error:", result.error);
            alert("Sign in failed: " + result.error);
          }
        } catch (e) {
          console.error("Sign in exception:", e);
          alert("Sign in failed. Check console for details.");
        }
      }}
      className="inline-block px-5 py-2.5 rounded-[4px] bg-vibe-accent text-white text-sm font-semibold hover:bg-vibe-accent-hover transition-colors cursor-pointer"
    >
      Sign in with GitHub
    </button>
  );
}
