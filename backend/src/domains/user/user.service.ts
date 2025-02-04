import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/domains/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivityService } from '../activity/activity.service';
import {
  ActivityAction,
  ActivityStatus,
  UpdatedField,
} from '../activity/activity.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly activityService: ActivityService,
  ) {}

  async findByEmailOrThrow(
    email: string,
    withRelations = false,
  ): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
      relations: withRelations
        ? {
            activity: true,
          }
        : undefined,
      order: { activity: { createdAt: 'DESC' } },
    });
  }

  async findByEmail(
    email: string,
    withRelations = false,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: withRelations
        ? {
            activity: true,
          }
        : undefined,
      order: { activity: { createdAt: 'DESC' } },
    });
  }

  async findById(id: string, withRelations = false): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: withRelations
        ? {
            activity: true,
          }
        : undefined,
      order: { activity: { createdAt: 'DESC' } },
    });

    return user;
  }

  async findByIdWithStatistics(
    id: string,
  ): Promise<{ user: User; totalLogins: number; totalDownloads: number }> {
    const user = await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        activity: true,
      },
      order: { activity: { createdAt: 'DESC' } },
    });

    user.activity = user.recentActivity;

    return {
      user,
      totalDownloads: user.totalDownloads,
      totalLogins: user.totalLogins,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: { activity: true },
      order: { activity: { createdAt: 'DESC' } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        activity: {
          id: true,
          action: true,
          status: true,
          createdAt: true,
        },
      },
    });

    users.forEach(user => {
      user.activity = user.recentActivity;
    });

    return users;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id, true);

    await this.userRepository.remove(user);
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const { email, name, password, role } = userData;
    const hashedPassword = await this.authService.hashPassword(password);

    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.password = hashedPassword;
    if (role) {
      newUser.role = role;
    }

    const savedUser = await this.userRepository.save(newUser);

    await this.activityService.createActivity({
      user: savedUser,
      action: ActivityAction.CREATE,
      status: ActivityStatus.SUCCESS,
    });

    return savedUser;
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.findById(id, true);

    Object.assign(user, userData);
    const savedUser = await this.userRepository.save(user);

    const updatedFields = Object.keys(userData).filter(key => userData[key]);

    for (const field of updatedFields) {
      await this.activityService.createActivity({
        user: savedUser,
        action: ActivityAction.UPDATE,
        status: ActivityStatus.SUCCESS,
        updatedField: field as UpdatedField,
      });
    }

    return savedUser;
  }
}
