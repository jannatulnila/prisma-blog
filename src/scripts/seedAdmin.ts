// import { UserRole } from "../../generated/prisma/enums";
// import { prisma } from "../lib/prisma";

import { UserRole } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

// async function seedAdmin() {
//     try {
//         const adminData = {
//             name: "admin",
//             email: "admin@gmail.com",
//             role: UserRole.ADMIN,
//             password: "Admin@12345",
//             emailVerified: true
// };
//         // check user exist on db or not
//         const existingUser = await prisma.user.findUnique({
//             where: {
//                 email: adminData.email 
//             }
//         })

//         if(existingUser){
//             throw new Error("User already exists");
//         }

//         const signUpAdmin = await fetch('http://localhost:3000/api/auth/sign-up/email', {
//             method: 'POST',
//             headers: {  
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(adminData)
//         });

//        console.log(signUpAdmin);

//     } catch (error) {
//         console.log(error);
//     }
// }

// seedAdmin();


async function seedAdmin(){
    try {

        const adminData ={
            name: process.env.ADMIN_NAME!,
            email: process.env.ADMIN_EMAIL!,
            password: process.env.ADMIN_PASSWORD!,
            role: UserRole.ADMIN,
            emailVerified: true
        }
       //check your exist on db or not
       const existingUser = await prisma.user.findUnique({
        where: {
            email: adminData.email
        }
       }) 
         if(existingUser){
            throw new Error("User already exists");
         }
            const signUpAdmin = await fetch('http://localhost:3000/api/auth/sign-up/email', {
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