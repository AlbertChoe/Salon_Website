// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcryptjs');

// const prisma = new PrismaClient();

// const addAdmin = async () => {
//   const adminExists = await prisma.user.findUnique({
//     where: { email: 'thomas.n@compfest.id' },
//   });

//   if (!adminExists) {
//     const hashedPassword = await bcrypt.hash('Admin123', 10);

//     const admin = await prisma.user.create({
//       data: {
//         fullName: 'Thomas N',
//         email: 'thomas.n@compfest.id',
//         phone: '08123456789',
//         password: hashedPassword,
//         role: 'Admin',
//       },
//     });

//     console.log('Admin user created:', admin);
//   } else {
//     console.log('Admin user already exists');
//   }
// };

// addAdmin()
//   .catch((e) => {
//     console.error(e);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
