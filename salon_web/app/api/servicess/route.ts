import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request) {
    try {
        const { name, duration, price, branchId, imageUrl } = await req.json();
        const session = await getServerSession(authOptions);
        
        if (!session || session.user.role !== 'Admin') {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        if (!name || !duration || !price || !branchId || !imageUrl) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const newService = await prisma.service.create({
            data: {
                name,
                duration: parseInt(duration, 10),
                price,
                imageUrl,
                branchId,
            },
        });

        return new NextResponse(JSON.stringify(newService), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/servicess:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}


export async function GET(req: NextRequest, res: NextApiResponse) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {

        const { searchParams } = new URL(req.url || '', `http://${req.headers.host}`);
        const branchId = searchParams.get('branchId');
        if (!branchId) {
            return new NextResponse(JSON.stringify({ error: 'BranchID is required' }), { status: 400 });
        }

        const services = await prisma.service.findMany({
            where: { branchId },
        });
        console.log(services);
        return new NextResponse(JSON.stringify(services), { status: 200 })
    } catch (error) {
        console.error('Error in GET /api/servicess:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}


