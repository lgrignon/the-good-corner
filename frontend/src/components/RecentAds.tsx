import { useEffect, useState } from "react";
import { AdCard, AdCardProps } from "./AdCard";

const ads: AdCardProps[] = [
    {
        title: 'Table', price: 120, url: "/ads/table", imageUrl: "/images/table.webp"
    },
    {
        title: 'Dame-jeanne', price: 75, url: "/ads/dame-jeanne", imageUrl: "/images/dame-jeanne.webp"
    },
    {
        title: 'Vide-poche', price: 4, url: "/ads/vide-poche", imageUrl: "/images/vide-poche.webp"
    }
    ,
    {
        title: 'Vaisselier', price: 900, url: "/ads/vaisselier", imageUrl: "/images/vaisselier.webp"
    }
    ,
    {
        title: 'Bougie', price: 8, url: "/ads/bougie", imageUrl: "/images/bougie.webp"
    }
    ,
    {
        title: 'Porte-magazine', price: 45, url: "/ads/porte-magazine", imageUrl: "/images/porte-magazine.webp"
    }

];

export function RecentAds() {

    const [totalPrice, setTotalPrice] = useState<number>();

    useEffect(() => {
        console.log('initialisation du totalPrice à 0');
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