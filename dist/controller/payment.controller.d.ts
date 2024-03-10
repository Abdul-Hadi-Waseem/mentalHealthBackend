import { PaymentService } from 'src/services/payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(paymentData: any): Promise<any>;
}
