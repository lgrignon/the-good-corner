import styles from './AdCard.module.css';

export interface AdCardProps {
    id: string;
    title: string;
    description?: string | null;
    price?: number | null;
    picture?: string | null;
}

export function AdCard({ id, description, title, price = 0, picture }: AdCardProps) {
    return <div className={styles.container}>
        <a className={styles["ad-card-link"]} href={`/ads/${id}`}>
            <img className={styles["ad-card-image"]} src={picture ?? '/images/file-question.svg'} />
            <div className={styles["ad-card-text"]} >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className={styles["ad-card-title"]}>{title}</div>
                    {description && <div>{description.toUpperCase()}</div>}
                </div>

                <div className={styles["ad-card-price"]}>{price} €</div>
            </div>
        </a>
    </div>;
}