import { Header } from "@/components/header/header";
import { Toolbar } from "@/components/toolbar/toolbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Toolbar />
      <div>FOOTER</div>
    </>
  );
}
