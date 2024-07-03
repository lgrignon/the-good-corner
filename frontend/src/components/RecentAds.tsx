import { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADS_QUERY } from "@/graphql-queries/ads";

export function RecentAds() {

    const [totalPrice, setTotalPrice] = useState<number>();

    const { data, loading, error } = useQuery(GET_ALL_ADS_QUERY);

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

    console.log('démonstration du retour de apollo client suite à la requête GraphQL ' , data);

    let ads: AdCardProps[] = [...data.getAllAds];
    ads = ads.sort((adLeft: AdCardProps, adRight: AdCardProps) => adLeft.title < adRight.title ? -1 : 1);

    return (
        <>
            <span>Le prix total est : {totalPrice}</span>
            <section className="recent-ads">

                {ads.map((adProps, index: number) => (
                    <div key={index}>
                        <AdCard {...adProps} />
                        <button onClick={() => addPrice(adProps.price)}>Add this price to total</button>
                    </div>
                ))}
            </section>
        </>
    );
}