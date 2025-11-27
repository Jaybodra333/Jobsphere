import { connectDB } from '../config/db';
import { env } from '../config/env';
import { User } from '../models/User';

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: env.admin.email });

  if (existing) {
    existing.name = env.admin.name;
    existing.password = env.admin.password;
    await existing.save();
    console.log('✅ Admin user updated');
  } else {
    await User.create({
      name: env.admin.name,
      email: env.admin.email,
      password: env.admin.password,
      role: 'admin',
    });
    console.log('✅ Admin user created');
  }

  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});

