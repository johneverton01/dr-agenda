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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log("Form submitted with data:", data);
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
                <Input type="email" placeholder="E-mail" {...field} />
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
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>    
          )}
        />
      </CardContent>
      <CardFooter className="flex justify-end mt-4 gap-2">
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </CardFooter>
      </form>
    </Form>
  );
}
