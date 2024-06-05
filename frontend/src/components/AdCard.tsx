import styles from './AdCard.module.css';

export interface AdCardProps {
    id: number;
    title: string;
    description: string;
    url: string;
    price: number;
    picture: string;
}

export function AdCard({ title, url, price = 0, picture }: AdCardProps) {
    return <div className={styles.container}>
        <a className={styles["ad-card-link"]} href={url}>
            <img className={styles["ad-card-image"]} src={picture} />
            <div className={styles["ad-card-text"]} >
                <div className={styles["ad-card-title"]}>{title}</div>
                <div className={styles["ad-card-price"]}>{price} €</div>
            </div>
        </a>
    </div>;
}