"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

import { useState } from "react";

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  function handleSignOut() {
    setIsSigningOut(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/authentication");
        }
      }
    });
  }

  return (
    <Button onClick={handleSignOut} disabled={isSigningOut}>
      {isSigningOut ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Saindo...
          </>
        ) : "Sair"}
    </Button>
  );
}