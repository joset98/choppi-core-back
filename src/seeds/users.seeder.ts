import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../auth/user.entity';
import * as bcrypt from 'bcrypt';

export class UsersSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    // Hash passwords using bcrypt
    const hashedPassword1 = await bcrypt.hash('admin123', 10);
    const hashedPassword2 = await bcrypt.hash('user123', 10);

    const users = [
      {
        email: 'admin@choppi.com',
        password: hashedPassword1,
      },
      {
        email: 'user@choppi.com',
        password: hashedPassword2,
      },
    ];

    await userRepository.save(users);
  }
}