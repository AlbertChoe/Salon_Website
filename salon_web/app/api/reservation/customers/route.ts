import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '../../../../lib/prisma';

export async function GET(req: Request, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'Customer') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        const reservations = await prisma.reservation.findMany({
            where: {
                userId: session.user.id,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                service: true,
                date: true,
                time: true,
                branch: {
                    select: {
                        name: true,
                        location: true,
                    },
                },
            },
        });

        return new NextResponse(JSON.stringify({ reservations }), { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/reservations/customer:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
