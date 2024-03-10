import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    private readonly stripe;
    constructor(configService: ConfigService);
    createPayment(amount: number, id: string): Promise<any>;
}
