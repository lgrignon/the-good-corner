import { RecentAds } from "@/components/RecentAds";
import { withAutorization } from "@/components/withAuthorization";

const AdsHome = () => {
  return (
    <>
      <h2>Annonces récentes</h2>
      <RecentAds />
    </>
  );
}

export default withAutorization(AdsHome);