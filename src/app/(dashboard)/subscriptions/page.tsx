import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle
} from "../components/PageTemplate";
import { SubscriptionPlan } from "./components/SubscriptionPlan";

export default function SubscriptionsPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinaturas</PageTitle>
          <PageDescription>Gerencie suas assinaturas</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <SubscriptionPlan className='w-[350px]' active={false} userEmail="" />
      </PageContent>
    </PageContainer>
  );
}
