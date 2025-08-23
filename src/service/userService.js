import DatabaseOperations from "../core/dbOperations";
import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserService {
    constructor() {
        this.dbOperations = new DatabaseOperations(User);
        this.JWT_SECRET = process.env.JWT_SECRET 
    }

    async getUserDetailsbyEmail(email) {
        try {
            const filter = {email: email};
            const projection = {email: 1, username: 1, password: 1, _id: 1, role: 1};
            const result = await this.dbOperations.findOne(filter, projection);
            return result;
        } catch (error) {   
            throw new Error(`Error fetching user details: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            const user = await this.getUserDetailsbyEmail(email);
            
            if (!user) {
                throw new Error('User not found');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: user._id,
                    email: user.email,
                    role: user.role // if you have roles
                },
                this.JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Return user data (excluding password) and token
            const { password: _, ...userWithoutPassword } = user.toObject();
            
            return {
                user: userWithoutPassword,
                token
            };
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async isValidUser(query) {
        try {
            const user = await this.getUserDetails(query);
            return !!user;
        } catch (error) {
            throw new Error(`Error validating user: ${error.message}`);
        }
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

export const userService = new UserService();
export default userService;