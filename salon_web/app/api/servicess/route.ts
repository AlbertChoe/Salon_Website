
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';

export async function POST(req: Request, res: NextResponse) {
    try {
        const { name, duration, price } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'Admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

        if (!name || !duration || !price) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const newService = await prisma.service.create({
            data: {
                name,
                duration: parseInt(duration, 10),
                price,
            },
        });

        return new NextResponse(JSON.stringify(newService), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/servicess:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

export async function GET(req: Request, res: NextResponse) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const services = await prisma.service.findMany();
        return new NextResponse(JSON.stringify({ services }), { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/servicess:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}