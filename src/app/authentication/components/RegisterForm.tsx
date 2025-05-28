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
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .trim()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  password: z.string().trim().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export function RegisterForm() {
  const router = useRouter();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  function resetForm() {
    registerForm.reset();
  }

  function IsFormDisabled() {
    return registerForm.formState.isSubmitting;
  }

  async function onSubmit(data: z.infer<typeof registerSchema>) {
   await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    }, {
      onSuccess: () => {
        resetForm();
        router.push("/dashboard");
      },
      onError: (error) => {
        console.error("Error during registration:", error);
      }
    })
  }

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome: </FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail: </FormLabel>
              <FormControl>
                <Input type="email" placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password </FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
      </CardContent>
      <CardFooter className="flex flex-col mt-4 gap-2">
        <Button
          className="w-full"
          disabled={IsFormDisabled()}
          type="button"
          variant="outline"
          onClick={resetForm}
        >
          Cancelar
        </Button>
        <Button
          className="w-full"
          type="submit"
          disabled={IsFormDisabled()}
        >
          { IsFormDisabled() ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Criar Conta"
          )}
        </Button>
      </CardFooter>
      </form>
    </Form>
  );
}
