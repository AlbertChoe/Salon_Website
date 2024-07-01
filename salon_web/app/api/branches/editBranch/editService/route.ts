import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../../../auth/[...nextauth]/authOptions';
import prisma from '../../../../../lib/prisma';

export async function PUT(request: Request) {
    try {
      const { id, name, duration, price, imageUrl } = await request.json();
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== 'Admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
  
      if (!id || !name || !duration || !price ) {
        return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
      }
  
      const updatedService = await prisma.service.update({
        where: { id },
        data: { name, duration, price, imageUrl },
      });
  
      return new NextResponse(JSON.stringify(updatedService), { status: 200 });
    } catch (error) {
      console.error('Error in PUT /api/services/editService:', error);
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
  
export async function DELETE(request: Request) {
    try {
      const { id } = await request.json();
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== 'Admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
  
      if (!id) {
        return new NextResponse(JSON.stringify({ error: 'Service ID is required' }), { status: 400 });
      }
  
      await prisma.service.delete({
        where: { id },
      });
  
      return new NextResponse(JSON.stringify({ message: 'Service deleted successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error in DELETE /api/services/deleteService:', error);
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }