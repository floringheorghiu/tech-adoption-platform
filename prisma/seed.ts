import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('SEED SCRIPT STARTED');
  // Hash the passwords
  const hashedTestPassword = await bcrypt.hash('test123', 10);
  const hashedAdminPassword = await bcrypt.hash('adm123', 10);

  // Create or update test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedTestPassword,
      totalBudget: 1000,
      allocatedBudget: 0,
      remainingBudget: 1000,
    },
  });
  console.log('Created/updated test user:', testUser);

  // Create or update admin user
  try {
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {
        password: hashedAdminPassword,
        name: 'Admin',
      },
      create: {
        email: 'admin@example.com',
        name: 'Admin',
        password: hashedAdminPassword,
      },
    });
    console.log('Created/updated admin user:', adminUser);
  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  }

  console.log('SEED SCRIPT FINISHED');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
