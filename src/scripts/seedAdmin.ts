import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

async function seedAdmin() {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
            role: process.env.ADMIN_ROLE as UserRole,
};
        // check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        })
        if(existingUser){
            throw new Error("User already exists");
        }

        const signUpAdmin = await fetch('http://localhost:4000/api/auth/signup', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
        });

       console.log(signUpAdmin);

    } catch (error) {
        console.log(error);
    }
}

seedAdmin();