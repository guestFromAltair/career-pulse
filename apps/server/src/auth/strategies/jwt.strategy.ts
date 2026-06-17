import {Injectable, UnauthorizedException, Logger} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '@nestjs/config';
import {UsersService} from '../../users/users.service';
import {JwtPayload} from '@careerpulse/shared';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        const secret = configService.get<string>('jwt.secret');
        if (!secret) {
            throw new Error('FATAL: jwt.secret environment variable is missing!');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: JwtPayload) {
        this.logger.debug(`JWT validated for user: ${payload.sub}`);

        const user = await this.usersService.findById(payload.sub);

        return this.usersService.sanitize(user);
    }
}