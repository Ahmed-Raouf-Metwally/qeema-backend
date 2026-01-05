const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    console.log('Start seeding ...');

    // 1. Create Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { phone: '01000000000' },
        update: {
            password: adminPassword, // Force update password to ensure login works
        },
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
        // Tech & Programming
        {
            name: 'Introduction to React',
            description: 'Learn the basics of React.js, components, and state management.',
            image: 'https://placehold.co/600x400?text=React',
            rating: 5,
        },
        {
            name: 'Advanced Node.js',
            description: 'Deep dive into Node.js streams, buffers, and event loop architecture.',
            image: 'https://placehold.co/600x400?text=Node.js',
            rating: 4,
        },
        {
            name: 'Clean Architecture',
            description: 'Mastering clean architecture principles for scalable software design.',
            image: 'https://placehold.co/600x400?text=Architecture',
            rating: 5,
        },
        {
            name: 'Database Design Fundamentals',
            description: 'Learn how to design normalized and efficient relational databases.',
            image: 'https://placehold.co/600x400?text=Databases',
            rating: 4,
        },
        {
            name: 'Python for Beginners',
            description: 'Start your programming journey with Python 3. Great for automation and data.',
            image: 'https://placehold.co/600x400?text=Python',
            rating: 5,
        },

        // Mathematics
        {
            name: 'Algebra I',
            description: 'Understanding variables, equations, and functions.',
            image: 'https://placehold.co/600x400?text=Algebra',
            rating: 3,
        },
        {
            name: 'Calculus I',
            description: 'Limits, derivatives, and integrals. The foundation of modern engineering.',
            image: 'https://placehold.co/600x400?text=Calculus',
            rating: 5,
        },
        {
            name: 'Geometry Basics',
            description: 'Shapes, sizes, relative positions of figures, and properties of space.',
            image: 'https://placehold.co/600x400?text=Geometry',
            rating: 4,
        },

        // Science
        {
            name: 'Physics: Mechanics',
            description: 'Motion, forces, energy, and momentum. How the physical world moves.',
            image: 'https://placehold.co/600x400?text=Physics',
            rating: 5,
        },
        {
            name: 'Biology: Cell Structure',
            description: 'Explore the building blocks of life: cells and their organelles.',
            image: 'https://placehold.co/600x400?text=Biology',
            rating: 4,
        },
        {
            name: 'Chemistry: The Periodic Table',
            description: 'Understanding elements, atomic structure, and chemical bonds.',
            image: 'https://placehold.co/600x400?text=Chemistry',
            rating: 4,
        },

        // History & Geography
        {
            name: 'World History: Ancient Civilizations',
            description: 'From Mesopotamia to Egypt and the Indus Valley. The dawn of humanity.',
            image: 'https://placehold.co/600x400?text=History',
            rating: 5,
        },
        {
            name: 'Geography: World Maps',
            description: 'Understanding continents, oceans, and geopolitical borders.',
            image: 'https://placehold.co/600x400?text=Geography',
            rating: 3,
        },

        // Languages
        {
            name: 'English Grammar 101',
            description: 'Mastering the rules of English grammar, punctuation, and style.',
            image: 'https://placehold.co/600x400?text=English',
            rating: 4,
        },
        {
            name: 'Arabic Literature',
            description: 'Exploring the richness of Arabic poetry and prose through the ages.',
            image: 'https://placehold.co/600x400?text=Arabic',
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
