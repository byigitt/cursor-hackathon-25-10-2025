import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import DashboardHeader from "./_components/dashboard-header";
import DashboardSidebar from "./_components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { 
      id: true, 
      name: true, 
      email: true, 
      image: true 
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-50 dark:bg-[#101922]">
      <DashboardHeader user={user} />
      
      <div className="flex flex-1">
        <DashboardSidebar user={user} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

