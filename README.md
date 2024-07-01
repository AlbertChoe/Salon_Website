<h1 align="center">SEA Salon Management System</h1>
<h3 align="center">Efficient Management and Reservation System</p>

![GitHub last commit](https://img.shields.io/github/last-commit/AlbertChoe/Salon_Website)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation ](#installation)
- [Links](#links)

## Overview

![salon image](image/image.png)
![review page](image/image-5.png)
![add branch page](image/image-4.png)
![add service page](image/image-3.png)
![branch page](image/image-2.png)
![branch detail page](image/image-1.png)
![User Dashboard](image/image-6.png)

Here is the purpose of making this project:
- To join Compfest Academy
- To provide a seamless experience for customers to book salon services.
- To offer salon owners a robust platform for managing branches and services.
- To implement modern web development technologies for efficient performance and user experience.
- To explore and apply efficient data fetching strategies in a Next.js application.

## Features
- Dynamic and static rendering for optimal performance.
- Service management including add, edit, and delete functionalities.
- Branch management with default services upon creation.
- Customer reservation system with time slot management.
- Admin and customer roles with specific functionalities.

## Built With

- [NextJS](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Aiven](https://aiven.io/)

## Prerequisites

To run this project, you will need:

- `Node.js`: Node.js is essential for running JavaScript on the server-side and for managing JavaScript-based build processes, including those used in Next.js applications.
- `npm` (Node package manager): npm is used to install and manage JavaScript packages and libraries, including those required for Next.js development.


## Environment Variables
To run this project, you will need to add the following environment variables to your .env file:
```shell
DATABASE_URL=your_database_url
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

.env for development of this project: 
```shell
DATABASE_URL="postgres://avnadmin:AVNS_8wS238RcHOItpuSN3PV@pg-fe146df-seasalon-website24.l.aivencloud.com:15468/defaultdb?sslmode=require"
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dufwj7va2
NEXT_PUBLIC_CLOUDINARY_API_KEY=295185745864686
NEXT_PUBLIC_CLOUDINARY_API_SECRET=Q4L9geRqzt-Tfu4zs451YBRrzkc
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ethvj9nt
```


## Installation 
Follow these steps:
1. Clone this repository :

```shell
git clone https://github.com/AlbertChoe/Salon_Website.git
```

2. Navigate to the src directory of the program by running the following command in the terminal:

```shell
cd Salon_Website/salon_web
```

3. Install the required packages:
```shell
npm install
```

4. Set up your Prisma database:
```shell
npx prisma migrate dev
```
5. Start the development server:
```shell
npm run dev
```
The application should now be running at http://localhost:3000.


## Links
- Live Demo: https://salon-website-eight.vercel.app/
- Repository: https://github.com/AlbertChoe/Salon_Website 
- LinkedIn: https://www.linkedin.com/in/albertchoe2004/ 


