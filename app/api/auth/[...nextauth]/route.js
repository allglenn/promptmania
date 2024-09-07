import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../../utils/database";
import User from '../../../../models/User';

connectToDatabase().then(() => console.log('Database connected'));
// Establish a database connection once when the server starts.

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const userSession = await User.findOne({ email: session.user.email }).exec();
                if (!userSession) {
                    console.error(`User session not found for email: ${session.user.email}`);
                    throw new Error('User session not found');
                }
                session.user.id = userSession._id.toString();
                return session;
            } catch (error) {
                console.error('Failed to retrieve user session:', error);
                throw error; // Consider how to handle this case in your app's flow
            }
        },
        async signIn({ account, profile, user, credentials }) {
            try {
                const userExists = await User.findOne({ email: profile.email }).exec();
                if (userExists) {
                    console.log('User exists:', userExists);
                    return true;
                }
                const newUser = new User({
                    name: profile.name.toLowerCase(),
                    email: profile.email.toLowerCase(),
                    image: profile.image,
                    password: null,
                });
                await newUser.save();
                return true;
            } catch (error) {
                console.error('Error during sign-in:', error);
                return false;
            }
        }
    }
});


export {
    handler as GET,
    handler as POST
}
