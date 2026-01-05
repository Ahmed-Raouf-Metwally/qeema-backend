const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verify() {
    console.log("--- Login Verification ---");

    // 1. Fetch Admin
    const admin = await prisma.user.findUnique({
        where: { phone: '01000000000' }
    });

    if (!admin) {
        console.error("❌ Admin user NOT FOUND in database!");
        return;
    }
    console.log("✅ Admin found in DB:", admin.phone);
    console.log("   Stored Hash:", admin.password.substring(0, 10) + "...");

    // 2. Test Password Configuration
    const plain = 'admin123';
    const isMatch = await bcrypt.compare(plain, admin.password);

    if (isMatch) {
        console.log("✅ Password 'admin123' MATCHES the stored hash.");
    } else {
        console.error("❌ Password 'admin123' DOES NOT match the stored hash.");

        // Debug: Create a new hash to see difference
        const newHash = await bcrypt.hash(plain, 10);
        console.log("   Expected Hash format:", newHash.substring(0, 10) + "...");
    }

    await prisma.$disconnect();
}

verify().catch(console.error);
