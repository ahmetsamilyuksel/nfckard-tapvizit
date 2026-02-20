import { prisma } from "@/lib/prisma";
import AdminConsentsClient from "./AdminConsentsClient";

export const dynamic = "force-dynamic";

export default async function AdminConsentsPage() {
  const consents = await prisma.consent.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminConsentsClient consents={consents} />;
}
