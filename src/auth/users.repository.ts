import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credetials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const newUser = this.create({ username, password });

    try {
      await this.save(newUser);
    } catch (ex) {
      if (ex.code === '23505') {
        throw new ConflictException('username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
