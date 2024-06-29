"use client"

import { useEffect, useState } from 'react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
  imageUrl?: string;
}

interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  services: Service[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        console.log(params.slug);
        const response = await fetch(`/api/branches/${params.slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBranch(data);
        setLoading(false);
      } catch (e) {
        setError('Failed to fetch branch details');
        setLoading(false);
        console.error(e);
      }
    };

    fetchBranch();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!branch) {
    return <div>No branch found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center mb-6">{branch.name}</h1>
      <div className="mb-6 text-center">
        <p className="text-lg">{branch.location}</p>
        <p className="text-lg">Phone: {branch.phone}</p>
        <p className="text-lg">Opening Time: {branch.openingTime}</p>
        <p className="text-lg">Closing Time: {branch.closingTime}</p>
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">Services Available</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branch.services.length > 0 ? (
          branch.services.map(service => (
            <div key={service.id} className="shadow-lg p-6">
              {service.imageUrl && (
                <div style={{ backgroundImage: `url(${service.imageUrl})`, backgroundSize: 'cover', height: '200px' }}></div>
              )}
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-yellow-500 mt-2">IDR {service.price}</p>
              <p className="mt-2 text-gray-700">{service.duration} minutes</p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No services available at this branch.</p>
        )}
      </div>
    </div>
  );
}
