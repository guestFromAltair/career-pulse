import {Injectable, UnauthorizedException, Logger} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {AuthService} from '../auth.service';
import {User} from '../../generated/prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<Omit<User, 'password'>> {
        this.logger.log(`Login attempt for: ${email}`);

        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}