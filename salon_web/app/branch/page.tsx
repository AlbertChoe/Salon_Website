import prisma from '../../lib/prisma';
import BranchCard from './branchCard';

const BranchesPage = async () => {
  const branches = await prisma.branch.findMany();
  console.log(branches);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Branches</h1>
      <p className="max-w-3xl mx-auto text-center mb-8 text-gray-700 text-xl">
        Discover our conveniently located branches offering a wide range of beauty and grooming services.
        Each branch is staffed with experienced professionals dedicated to providing you with the best service possible.
      </p>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {branches.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {branches.map(branch => (
              <BranchCard key={branch.id} branch={branch}>
               
              </BranchCard>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-xl font-semibold text-gray-800">No branches available at the moment.</h2>
            <p className="text-gray-600 mt-4">Please check back later for updated branch information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchesPage;
