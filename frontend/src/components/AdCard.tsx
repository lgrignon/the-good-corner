import styles from './AdCard.module.css';

export interface AdCardProps {
    title: string;
    url: string;
    price: number;
    imageUrl: string;
}

export function AdCard({ title, url, price = 0, imageUrl }: AdCardProps) {
    return <div className={styles.container}>
        <a className={styles["ad-card-link"]} href={url}>
            <img className={styles["ad-card-image"]} src={imageUrl} />
            <div className={styles["ad-card-text"]} >
                <div className={styles["ad-card-title"]}>{title}</div>
                <div className={styles["ad-card-price"]}>{price} €</div>
            </div>
        </a>
    </div>;
}