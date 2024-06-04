import { Header } from "@/components/Header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode | ReactNode[] }) {
    return <>
        <Header />
        <main className="main-content">
            {children}
        </main>
    </>
}