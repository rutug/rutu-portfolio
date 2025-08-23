import userService from './src/service/userService.js';
import connectDB from './src/core/mongo.js';

async function testDatabase() {
    try {
        console.log('Testing database connection...');
        
        // Test connection
        await connectDB();
        console.log('✅ Database connection successful');
        
        // Test user query
        console.log('\nTesting user query...');
        const testEmail = 'test@example.com'; // Replace with an email that exists in your database
        const user = await userService.getUserDetailsbyEmail(testEmail);
        
        if (user) {
            console.log('✅ User found:', user);
        } else {
            console.log('❌ No user found with email:', testEmail);
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testDatabase();
