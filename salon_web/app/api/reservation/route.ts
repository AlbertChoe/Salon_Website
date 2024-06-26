import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'customer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { name, phone, service, dateTime } = req.body;

  if (!name || !phone || !service || !dateTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const reservation = await prisma.reservation.create({
    data: {
      name,
      phone,
      service,
      dateTime,
    },
  });

  return res.status(201).json(reservation);
}
