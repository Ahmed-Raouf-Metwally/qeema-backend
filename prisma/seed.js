const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    console.log('Start seeding ...');

    // 1. Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { phone: '01000000000' },
        update: {},
        create: {
            fullName: 'School Admin',
            phone: '01000000000',
            password: adminPassword,
            role: 'ADMIN',
            class: 'N/A',
            year: 'N/A',
        },
    });
    console.log('Admin created/upserted:', admin.phone);

    // 2. Create School Profile (Singleton check)
    const existingSchool = await prisma.school.findFirst();
    if (!existingSchool) {
        const school = await prisma.school.create({
            data: {
                name: 'Qeema Tech School',
                phone: '0123456789',
                logo: 'https://placehold.co/100x100?text=Logo', // Placeholder, no icons
            }
        });
        console.log('School profile created:', school.name);
    }

    // 3. Create Sample Lessons
    const lessonsData = [
        {
            name: 'Introduction to React',
            description: 'Learn the basics of React.js, components, and state.',
            image: 'https://placehold.co/600x400?text=React',
            rating: 5,
        },
        {
            name: 'Advanced Node.js',
            description: 'Deep dive into Node.js streams, buffers, and architecture.',
            image: 'https://placehold.co/600x400?text=Node.js',
            rating: 4,
        },
        {
            name: 'Clean Architecture',
            description: 'Mastering clean architecture principles in software design.',
            image: 'https://placehold.co/600x400?text=Architecture',
            rating: 5,
        },
    ];

    for (const l of lessonsData) {
        // Check if lesson exists by name (simplified check)
        const existing = await prisma.lesson.findFirst({ where: { name: l.name } });
        if (!existing) {
            await prisma.lesson.create({ data: l });
            console.log(`Lesson created: ${l.name}`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
