import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { RecentAds } from "@/components/RecentAds";

export default function Home() {
  return (
    <>
        <Header />
        <main className="main-content">
          <h2>Annonces récentes</h2>
          <RecentAds />
        </main>
    </>
  );
}
