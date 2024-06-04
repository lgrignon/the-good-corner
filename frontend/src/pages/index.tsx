import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import { RecentAds } from "@/components/RecentAds";

// import * as X from "@/components/RecentAds";
// X.RecentAds
// import AdDetails from "./ads/[id]";

export default function Home() {
  return (
    <>
      <h2>Annonces récentes</h2>
      <RecentAds />
    </>
  );
}
