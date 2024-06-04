import { useRouter } from "next/router";

export default function AdDetails() {

    const router = useRouter();

    console.log(router)
    const adId: number = parseInt(router.query.id as string);

    return <p>Ceci est l'annonce : {adId ?? 'ID non reconnu'}</p>;
}