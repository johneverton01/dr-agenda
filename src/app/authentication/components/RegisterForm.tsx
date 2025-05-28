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

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log("Form submitted with data:", data);
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
      <CardFooter className="flex justify-end mt-4 gap-2">
        <Button type="submit" className="w-full">
          Criar Conta
        </Button>
      </CardFooter>
      </form>
    </Form>
  );
}
