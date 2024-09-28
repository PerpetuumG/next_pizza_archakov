import { NextResponse } from 'next/server';
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
  try {
    // const user = await getUserSession();
    const user = await getServerSession(req, res, authOptions);

    if (!user) {
      return NextResponse.json({ message: '[USER_GET] Вы не авторизованы' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
