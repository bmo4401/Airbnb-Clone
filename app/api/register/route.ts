import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcryptjs-react';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
   const body = await request.json();
   const { email, name, password } = body;
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(password, salt);
   const user = await prisma.user.create({
      data: {
         email,
         name,
         hashedPassword,
      },
   });

   return NextResponse.json(user);
}
