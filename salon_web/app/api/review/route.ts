
import { getServerSession } from 'next-auth/next';
import {  NextResponse } from 'next/server';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';

export async function POST(request: Request, res: NextResponse) {
    try {
        const formData = await request.json();
        const { name, rating, comment } = formData;
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'Customer') {
            return NextResponse.rewrite(new URL('/unauthorized', request.url));
        }

        if (!name || !rating || !comment) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                name,
                rating,
                comment,
                userId: session.user.id,
            },
        });

        return new NextResponse(JSON.stringify(review), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/review:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
