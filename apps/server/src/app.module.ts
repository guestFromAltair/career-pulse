import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';
import {PrismaModule} from './prisma/prisma.module';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        ScheduleModule.forRoot(),
        PrismaModule
    ]
})
export class AppModule {
}