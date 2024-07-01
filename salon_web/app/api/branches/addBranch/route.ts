import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/[...nextauth]/authOptions';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const { name, location, phone, openingTime, closingTime } = await request.json();
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'Admin') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        if (!name || !location || !phone || !openingTime || !closingTime) {
            return new NextResponse(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const newBranch = await prisma.branch.create({
            data: {
                name,
                location,
                phone,
                openingTime,
                closingTime,
                services: {
                    create: [
                        {
                            name: "Haircuts and Styling",
                            duration: 60,
                            price: "800.000",
                            imageUrl:"https://res.cloudinary.com/dufwj7va2/image/upload/v1719819837/plvzezxbvayfpaz7ytmr.webp"
                        },
                        {
                            name: "Manicure and Pedicure",
                            duration: 30,
                            price: "400.000",
                            imageUrl:"https://res.cloudinary.com/dufwj7va2/image/upload/v1719819867/twql5xvv5lcyqsuartws.webp"
                        },
                        {
                            name: "Facial Treatments",
                            duration: 45,
                            price: "600.000",
                            imageUrl:"https://res.cloudinary.com/dufwj7va2/image/upload/v1719819895/xtmkuuqn1skc4zfecico.webp"
                        }
                    ]
                }
            },
            include: {
                services: true
            }
        });

        return new NextResponse(JSON.stringify(newBranch), { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/addBranch:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
