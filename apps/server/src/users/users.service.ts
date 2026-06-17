import {Injectable, ConflictException, NotFoundException, Logger} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(private readonly prisma: PrismaService) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        const existing = await this.prisma.user.findUnique({
            where: {email: dto.email.toLowerCase().trim()}
        });

        if (existing) {
            throw new ConflictException('An account with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase().trim(),
                password: hashedPassword,
                firstName: dto.firstName.trim(),
                lastName: dto.lastName.trim()
            }
        });

        this.logger.log(`New user created: ${user.email} (${user.id})`);

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {email: email.toLowerCase().trim()}
        });
    }

    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {id}
        });

        if (!user) {
            throw new NotFoundException(`User not found`);
        }

        return user;
    }

    sanitize(user: User): Omit<User, 'password'> {
        const {password: _password, ...safeUser} = user;
        return safeUser;
    }
}