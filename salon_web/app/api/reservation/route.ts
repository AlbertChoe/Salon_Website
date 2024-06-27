import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';

export async function POST(req: Request, res: NextResponse) {
  try {
        const formData = await req.json();
        const { name, phone, service, date, time } = formData;


        const session = await getServerSession( authOptions);
        if (!session || session.user.role !== 'Customer') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        if (!name || !phone || !service || !date || !time) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const reservation = await prisma.reservation.create({
            data: {
                name,
                phone,
                service,
                date,
                time,
            },
        });

        return new NextResponse(JSON.stringify(reservation), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/reservation:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
