const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany();
    console.log('--- USERS IN DB ---');
    console.log(users.map(u => ({ phone: u.phone, role: u.role, passwordHash: u.password.substring(0, 10) + '...' })));
    console.log('-------------------');
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
