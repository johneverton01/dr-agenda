import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export default async function AuthenticationPage() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (session) {
      redirect("/dashboard");
    }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
      <Image src="/logo.svg" alt="Dr agenda" width={100} height={100} />
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="gap-3">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Faça login para continuar.</CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="gap-3">
            <CardHeader>
              <CardTitle>Criar Conta</CardTitle>
              <CardDescription>Crie uma conta para continuar.</CardDescription>
            </CardHeader>
            <RegisterForm />
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}
