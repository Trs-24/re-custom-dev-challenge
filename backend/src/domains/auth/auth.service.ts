import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/domains/user/dto/create-user.dto';
import { User } from 'src/domains/user/entities/user.entity';
import { UserService } from 'src/domains/user/user.service';
import { ActivityAction, ActivityStatus } from '../activity/activity.types';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly activityService: ActivityService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(user: User) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async register(userData: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      userData.email,
      true,
    );
    if (existingUser)
      throw new ConflictException('User with this email exists');

    const user = await this.userService.createUser(userData);
    return {
      access_token: await this.generateToken(user),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ user: User; isValid: boolean }> {
    const user = await this.userService.findByEmailOrThrow(email, true);

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    return { user: user, isValid: isPasswordValid };
  }

  async login(email: string, password: string) {
    const { user, isValid } = await this.validateUser(email, password);
    if (!isValid) {
      await this.activityService.createActivity({
        user,
        action: ActivityAction.LOGIN,
        status: ActivityStatus.FAILURE,
      });

      throw new UnauthorizedException('Invalid username or password');
    }

    await this.activityService.createActivity({
      user,
      action: ActivityAction.LOGIN,
      status: ActivityStatus.SUCCESS,
    });

    return {
      access_token: await this.generateToken(user),
    };
  }
}
