// payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() paymentData: any): Promise<any> {
    const { amount, id } = paymentData;
    return this.paymentService.createPayment(amount, id);
  }
}
