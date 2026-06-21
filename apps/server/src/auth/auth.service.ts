import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {RegisterDto} from './dto/register.dto';
import {User} from '../generated/prisma/client';
import {AuthResponse, JwtPayload} from '@careerpulse/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            this.logger.warn(`Login attempt for non-existent account`);
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn(`Failed login attempt for user: ${user.id}`);
            return null;
        }

        this.logger.log(`Successful login for user: ${user.id}`);

        return this.usersService.sanitize(user);
    }

    async register(dto: RegisterDto): Promise<AuthResponse> {
        const user = await this.usersService.create(dto);
        const safeUser = this.usersService.sanitize(user);

        return {
            accessToken: this.generateToken(user),
            user: {
                ...safeUser,
                createdAt: safeUser.createdAt.toISOString(),
                updatedAt: safeUser.updatedAt.toISOString()
            }
        };
    }

    async login(user: Omit<User, 'password'>): Promise<AuthResponse> {
        return {
            accessToken: this.generateToken(user as User),
            user: {
                ...user,
                createdAt: (user.createdAt as unknown as Date).toISOString(),
                updatedAt: (user.updatedAt as unknown as Date).toISOString()
            }
        };
    }

    private generateToken(user: User): string {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
        };

        return this.jwtService.sign(payload);
    }
}