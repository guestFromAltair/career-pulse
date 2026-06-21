import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';
import {PrismaModule} from './prisma/prisma.module';
import configuration from './config/configuration';
import {UsersModule} from "./users/users.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        ScheduleModule.forRoot(),
        PrismaModule,
        UsersModule,
        AuthModule
    ]
})
export class AppModule {
}