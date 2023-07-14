"use client";
import Container from "@/app/components/container";
import General from "@/app/components/generalContainer";
import Sidebar from "@/app/components/sidebar";
import Links from "@/app/components/sidebar/links";

const links = [
  {
    label: "Overview",
    href: "/dashboardPage",
    image: "/basic/overview.svg",
    imageActive: "/basic/overviewActive.svg",
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    image: "/basic/transaction.svg",
    imageActive: "/basic/transactionActive.svg",
  },
  {
    label: "Goals",
    href: "/dashboard/goals",
    image: "/basic/goals.svg",
    imageActive: "/basic/goalsActive.svg",
  },
  {
    label: "Logout",
    href: "/logout",
    image: "/basic/settings.svg",
    imageActive: "/basic/settingsActive.svg",
  },
];

export default function Page() {
  return (
    <General>
      <Sidebar>
        <h2>Financial APP</h2>
        <Links items={links} />
      </Sidebar>
      <Container>
        <h1>Container</h1>
      </Container>
    </General>
  );
}
