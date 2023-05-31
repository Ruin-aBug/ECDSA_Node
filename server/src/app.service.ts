import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('balances') private balances: Map<string, number>) {}
  getHello(): string {
    return 'Hello World!';
  }

  getBalance(address: string): number {
    const balance = this.balances.get(address) || 0;
    return balance;
  }

  send(sender: string, recipient: string, amount: number): boolean | number {
    this.setInitialBalance(sender);
    this.setInitialBalance(recipient);

    const senderAmount = this.balances.get(sender);

    if (senderAmount < amount) {
      return false;
    }
    const recipientAmount = this.balances.get(recipient);
    console.log(recipientAmount);
    this.balances.set(sender, senderAmount - amount);
    this.balances.set(recipient, recipientAmount + amount);
    console.log(this.balances.get(recipient));
    return this.balances.get(sender);
  }

  private setInitialBalance(address: string) {
    if (!this.balances.get(address)) {
      this.balances.set(address, 0);
    }
  }
}
