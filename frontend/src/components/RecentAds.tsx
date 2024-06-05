import { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";

const BACKEND_URL = 'http://localhost:4000';

async function fetchAds(): Promise<AdCardProps[]> {
    try {
        const { data } = await axios.get<AdCardProps[]>(BACKEND_URL + '/ads');
        return data.sort((adLeft: AdCardProps, adRight: AdCardProps) => adLeft.title < adRight.title ? -1 : 1);
    } catch (e) {
        console.error(e, 'cannot fetch ads - falling back to empty array');
        return [];
    }
}

export function RecentAds() {

    const [totalPrice, setTotalPrice] = useState<number>();
    const [ads, setAds] = useState<AdCardProps[]>([]);

    async function initAds() {
        const ads: AdCardProps[] = await fetchAds();
        setAds(ads);
    }

    useEffect(() => {
        console.log('initialisation du totalPrice à 0');
        initAds();
        setTotalPrice(0);
    }, []);

    function addPrice(price: number): void {

        setTotalPrice(totalPrice! + price);
    }

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