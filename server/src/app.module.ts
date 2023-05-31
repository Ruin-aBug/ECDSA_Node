import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const balances = () => {
  const balances = new Map<string, number>();
  balances.set('0x01', 100);
  balances.set('0x02', 50);
  balances.set('0x03', 75);
  return balances;
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'balances',
      useValue: balances(),
    },
  ],
  // exports: ["balances"]
})
export class AppModule {}
