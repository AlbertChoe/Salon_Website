import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '../../../../lib/prisma';

export async function PUT(request: Request) {
  try {
    const { id, name, location, phone, openingTime, closingTime } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (!id || !name || !location || !phone || !openingTime || !closingTime) {
      return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const updatedBranch = await prisma.branch.update({
      where: { id },
      data: { name, location, phone, openingTime, closingTime },
    });

    return new NextResponse(JSON.stringify(updatedBranch), { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/branches/editBranch:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
