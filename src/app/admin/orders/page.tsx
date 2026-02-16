import { prisma } from "@/lib/prisma";
import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      card: {
        select: {
          id: true,
          slug: true,
          firstName: true,
          lastName: true,
          title: true,
          company: true,
          theme: true,
          primaryColor: true,
          viewCount: true,
          createdAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <AdminOrdersClient orders={orders} />;
}
