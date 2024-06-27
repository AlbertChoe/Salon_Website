// import { getSession, GetSessionParams } from 'next-auth/react';
// import { GetServerSideProps } from 'next';
// import { Session } from 'next-auth';

// interface DashboardProps {
//   session: Session;
// }

// const Dashboard: React.FC<DashboardProps> = ({ session }) => {
//   return <div>Welcome to the Dashboard, {session.user?.email}!</div>;
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context as GetSessionParams);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };

// export default Dashboard;
