const BASE_URL = 'http://localhost:5000/api';

async function request(method, endpoint, body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await res.json();
    return { status: res.status, data };
}

async function main() {
    console.log('--- STARTING SYSTEM VERIFICATION ---');

    // 1. Admin Login
    console.log('[1] Testing Admin Login...');
    const adminLogin = await request('POST', '/auth/login', { phone: '01000000000', password: '123456789' });
    if (!adminLogin.data.success) {
        console.error("Login Error Details:", adminLogin.data);
        throw new Error('Admin Login Failed');
    }
    const adminToken = adminLogin.data.data.token;
    console.log('✅ Admin Logged In');

    // 2. Create Lesson (Admin)
    console.log('[2] Creating Test Lesson...');
    const newLesson = await request('POST', '/admin/lessons', {
        name: 'Verification Lesson',
        description: 'Created by automated test',
        image: 'https://placehold.co/100',
        rating: 5
    }, adminToken);

    if (newLesson.status !== 201) throw new Error('Create Lesson Failed: ' + newLesson.data.message);
    const lessonId = newLesson.data.data.id;
    console.log('✅ Lesson Created:', lessonId);

    // 3. Register New Student
    console.log('[3] Registering Test Student...');
    const uniquePhone = '012' + Date.now().toString().slice(-8);
    const register = await request('POST', '/auth/register', {
        fullName: 'Test Student',
        phone: uniquePhone,
        password: 'password123',
        class: '10A',
        year: '2024'
    });

    if (register.status !== 201) throw new Error('Registration Failed');
    const studentToken = register.data.data.token;
    console.log('✅ Student Registered:', uniquePhone);

    // 4. Get Lessons (Student)
    console.log('[4] Fetching Lessons as Student...');
    const lessons = await request('GET', '/lessons', null, studentToken);
    const found = lessons.data.data.lessons.find(l => l.id === lessonId);
    if (!found) throw new Error('New lesson not found in list');
    console.log('✅ Lesson visible to student');

    // 5. Add to Favorites
    console.log('[5] Adding to Favorites...');
    const fav = await request('POST', `/favorites/${lessonId}`, null, studentToken); // Fixed URL format
    if (fav.status !== 201) throw new Error('Add Favorite Failed: ' + fav.status);
    console.log('✅ Added to favorites');

    // 6. Get Favorites
    console.log('[6] Verifying Favorites...');
    const myFavs = await request('GET', '/favorites', null, studentToken);
    const isFav = myFavs.data.data.find(f => f.lessonId === lessonId);
    if (!isFav) throw new Error('Favorite not persisted');
    console.log('✅ Favorite persisted');

    // 7. Cleanup (Delete Lesson)
    console.log('[7] Cleaning up (Deleting Lesson)...');
    const del = await request('DELETE', `/admin/lessons/${lessonId}`, null, adminToken);
    if (del.status !== 200) {
        console.error("Delete Error:", del.data);
        throw new Error('Delete failed');
    }
    console.log('✅ Lesson deleted');

    console.log('-----------------------------------');
    console.log('🎉 ALL SYSTEMS GO! Backend is fully functional.');
}

main().catch(err => {
    console.error('❌ VERIFICATION FAILED:', err.message);
    process.exit(1);
});
