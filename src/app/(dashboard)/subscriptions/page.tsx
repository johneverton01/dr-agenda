import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle
} from "../components/PageTemplate";
import { SubscriptionPlan } from "./components/SubscriptionPlan";

export default async function SubscriptionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinaturas</PageTitle>
          <PageDescription>Gerencie suas assinaturas</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan 
          className='w-[350px]'
          active={session!.user.plan === "essential"}
          userEmail={session!.user.email}
        />
      </PageContent>
    </PageContainer>
  );
}
