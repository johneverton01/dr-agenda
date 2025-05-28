"use client"
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  password: z.string().trim().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export function LoginForm() {
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  function isLoading() {
    return loginForm.formState.isSubmitting;
  }

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
    }, {
      onSuccess: () => {
        loginForm.reset();
        router.push("/dashboard");
      },
      onError: () => {
        toast.error('E-mail ou senha inválidos', {
          description: 'Verifique suas credenciais e tente novamente.',
        });
      },
    });
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail: </FormLabel>
              <FormControl>
                <Input
                  disabled={ isLoading() }
                  type="email"
                  placeholder="E-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password </FormLabel>
              <FormControl>
                <Input 
                  disabled={ isLoading() }
                  type="password"
                  placeholder="Senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
      </CardContent>
      <CardFooter className="flex justify-end mt-4 gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={ isLoading() }
          >
          {isLoading() ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : "Entrar"}
        </Button>
      </CardFooter>
      </form>
    </Form>
  );
}
