import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ServerStylesheet } from "./utils/styles/ServerStyleSheet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projeto Financeiro",
  description: "Teste para o IN8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/sidebar/logo.svg" />
      </head>
      <body className={inter.className}>
        <ServerStylesheet>{children}</ServerStylesheet>
        <ToastContainer />
      </body>
    </html>
  );
}
