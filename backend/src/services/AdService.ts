import { Ad } from "../entities/Ad";
import { EmailService } from "./EmailService";

export class AdService {

    private readonly emailService: EmailService;

    constructor(
        emailService: EmailService = new EmailService()
    ) {
        this.emailService = emailService;
    }

    computeAdsAveragePrice(ads: Ad[]): number {
        if (ads.length == 0) {
            return 0;
        }

        const sum: number = ads.map(ad => ad.price ?? 0).reduce((previous, current) => {
            previous += current;
            return previous;
        }, 0);
        return sum / ads.length;
    }

    buyAd(ad: Ad/* , originatingUser: User */): void {
        // ad.sold = true
        // ad.buyer = originatingUser
        // await ad.save()

        console.log("will send email to owner")
        this.emailService.sendEmail(`L'offre ${ad.title} a été acceptée par ...`, ad.owner);
    }

}