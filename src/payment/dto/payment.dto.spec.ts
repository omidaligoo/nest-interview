import { PaymentDto } from './payment.dto';

describe('PaymentDto', () => {
  it('should be defined', () => {
    expect(new PaymentDto()).toBeDefined();
  });
});
