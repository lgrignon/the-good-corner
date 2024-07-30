import { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphql-queries/ads";
import { GetAllAdsQuery, useGetAllAdsQuery } from "@/generated/graphql-types";

export function RecentAds() {

    const [totalPrice, setTotalPrice] = useState<number>();

    const { data, loading, error } = useGetAllAdsQuery();

    useEffect(() => {
        console.log('initialisation du totalPrice à 0');
        setTotalPrice(0);
    }, []);

    function addPrice(price: number): void {

        setTotalPrice(totalPrice! + price);
    }

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error : {error.message}</p>;
    }

    const result: GetAllAdsQuery = data!;
    console.log('démonstration du retour de apollo client suite à la requête GraphQL ' , data);
    let ads: AdCardProps[] = [...result.getAllAds];
    ads = ads.sort((adLeft: AdCardProps, adRight: AdCardProps) => adLeft.title < adRight.title ? -1 : 1);

    return (
        <>
            <span>Le prix total est : {totalPrice}</span>
            <section className="recent-ads">

                {ads.map((adProps, index: number) => (
                    <div key={index}>
                        <AdCard {...adProps} />
                        <button onClick={() => addPrice(adProps.price ?? 0)}>Add this price to total</button>
                    </div>
                ))}
            </section>
        </>
    );
}