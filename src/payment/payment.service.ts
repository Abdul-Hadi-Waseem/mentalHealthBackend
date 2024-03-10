import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor(private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_TEST'), {
      apiVersion: '2023-10-16',
    });
  }

  async createPayment(amount: number, id: string): Promise<any> {
    try {
      const payment = await this.stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'Spatula company',
        payment_method: id,
        confirm: true,
      });
      console.log('Payment', payment);
      return {
        message: 'Payment successful',
        success: true,
      };
    } catch (error) {
      console.log('Error', error);
      return {
        message: 'Payment failed',
        success: false,
      };
    }
  }
}
