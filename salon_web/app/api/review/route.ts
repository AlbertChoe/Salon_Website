import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from '../../api/auth/[...nextauth]/authOptions';
import prisma from '../../../lib/prisma';



export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(1);
        const session = await getServerSession(req, res, authOptions);
        console.log(2);
        if (!session || session.user.role !== 'Customer') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log(3);

        const { name, rating, comment } = req.body;
        if (!name || !rating || !comment) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log(4);
        const review = await prisma.review.create({
            data: {
                name,
                rating,
                comment,
                userId: session.user.id, // Assuming userId is a foreign key in the review table
            },
        });

        return res.status(201).json(review);
    } catch (error) {
        console.error('Error in POST /api/review:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
