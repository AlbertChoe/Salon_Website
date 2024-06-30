import Link from 'next/link';
import React from 'react';

interface BranchCardProps {
  branch: {
    id: string;
    name: string;
    location: string;
    phone: string;
    openingTime: string;
    closingTime: string;
  };
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  return (
    <Link href={`/branch/${branch.id}`} className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
     
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{branch.name}</h2>
          <p className="text-gray-600"><strong>Location:</strong> {branch.location}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {branch.phone}</p>
          <p className="text-gray-600"><strong>Opening Time:</strong> {branch.openingTime}</p>
          <p className="text-gray-600"><strong>Closing Time:</strong> {branch.closingTime}</p>
        </div>
  
    </Link>
  );
};

export default BranchCard;
