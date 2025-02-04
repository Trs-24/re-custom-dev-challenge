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

  async findByEmail(email: string, withRelations = false): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
      relations: withRelations
        ? {
            activity: true,
          }
        : undefined,
    });
  }

  async findById(id: string, withRelations = false): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: withRelations
        ? {
            activity: true,
          }
        : undefined,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);

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
    const user = await this.findById(id);

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
