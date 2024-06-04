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
];

export function RecentAds() {

    return (
        <section className="recent-ads">

            {ads.map((adProps, index: number) => (
                <AdCard {...adProps} key={index} />
            ))}
            
            <div className="ad-card-container">
                <a className="ad-card-link" href="/ads/vaisselier">
                    <img className="ad-card-image" src="/images/vaisselier.webp" />
                    <div className="ad-card-text">
                        <div className="ad-card-title">Vaisselier</div>
                        <div className="ad-card-price">900 €</div>
                    </div>
                </a>
            </div>
            <div className="ad-card-container">
                <a className="ad-card-link" href="/ads/bougie">
                    <img className="ad-card-image" src="/images/bougie.webp" />
                    <div className="ad-card-text">
                        <div className="ad-card-title">Bougie</div>
                        <div className="ad-card-price">8 €</div>
                    </div>
                </a>
            </div>
            <div className="ad-card-container">
                <a className="ad-card-link" href="/ads/porte-magazine">
                    <img className="ad-card-image" src="/images/porte-magazine.webp" />
                    <div className="ad-card-text">
                        <div className="ad-card-title">Porte-magazine</div>
                        <div className="ad-card-price">45 €</div>
                    </div>
                </a>
            </div>
        </section>
    );
}