import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';
export async function POST(req: Request, res: NextResponse) {
    try {
      const formData = await req.json();
      const { name, phone, service, duration, date, time } = formData;
  
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== 'Customer') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
  
      if (!name || !phone || !service || !duration || !date || !time) {
        return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
      }
  
      const [startHour, startMinute] = time.split(':').map(Number);
      const endTime = new Date(0, 0, 0, startHour, startMinute + duration).toTimeString().slice(0, 5);
  
      await prisma.$transaction(async (prisma) => {
        const reservation = await prisma.reservation.create({
          data: {
            name,
            phone,
            service,
            date,
            time,
            userId: session.user.id
          },
        });
  
        await prisma.timeSlot.create({
          data: {
            date,
            startTime: time,
            endTime
          }
        });
  
        return reservation;
      });
  
      return new NextResponse(JSON.stringify({ message: 'Reservation created successfully' }), { status: 201 });
    } catch (error) {
      console.error('Error in POST /api/reservation:', error);
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
        return new NextResponse(JSON.stringify({ error: 'Date is required' }), { status: 400 });
    }

    try {
        const bookedSlots = await prisma.timeSlot.findMany({
            where: { date },
            select: { startTime: true, endTime: true },
            orderBy: { startTime: 'asc' } // Order by start time ascending
        });

        return new NextResponse(JSON.stringify({ bookedSlots }), { status: 200 });
    } catch (error) {
        console.error('Error fetching booked slots:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}