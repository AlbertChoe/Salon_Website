"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import ServiceCard from './serviceCard';
import EditBranchDialog from './editBranchDialog';
import EditServiceDialog from './editServiceDialog';

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
  const { data: session } = useSession();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBranch = async () => {
      try {
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
      }
    };

    fetchBranch();
  }, [params.slug]);

  const handleEditBranch = async (updatedBranch: Partial<Branch>) => {
    try {
      const response = await fetch('/api/branches/editBranch', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBranch),
      });

      if (response.ok) {
        const updatedBranchData = await response.json();
        setBranch(prevBranch => prevBranch ? { ...prevBranch, ...updatedBranchData } : prevBranch);
        setIsBranchModalOpen(false);
        toast.success('Branch updated successfully!');
      } else {
        console.error('Failed to update branch');
        toast.error('Failed to update branch');
      }
    } catch (error) {
      console.error('Error updating branch:', error);
      toast.error('Error updating branch');
    }
  };

  const handleEditService = async (updatedService: Partial<Service>) => {
    try {
      const response = await fetch('/api/branches/editBranch/editService', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });

      if (response.ok) {
        const updatedServiceData = await response.json();
        setBranch(prevBranch => {
          if (!prevBranch) return null;
          const updatedServices = prevBranch.services.map(service =>
            service.id === updatedServiceData.id ? { ...service, ...updatedServiceData } : service
          );
          return { ...prevBranch, services: updatedServices };
        });
        setIsServiceModalOpen(false);
        toast.success('Service updated successfully!');
      } else {
        console.error('Failed to update service');
        toast.error('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      toast.error('Error updating service');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await fetch('/api/branches/editBranch/editService', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: serviceId }),
      });

      if (response.ok) {
        setBranch(prevBranch => {
          if (!prevBranch) return null;
          const updatedServices = prevBranch.services.filter(service => service.id !== serviceId);
          return { ...prevBranch, services: updatedServices };
        });
        toast.success('Service deleted successfully!');
      } else {
        console.error('Failed to delete service');
        toast.error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    }
  };

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
    <div className="min-h-screen max-w-4xl mx-auto mt-10 mb-10">
      <h1 className="text-4xl font-bold text-center mb-6">{branch.name}</h1>
      <div className="mb-6 text-center">
        <p className="text-lg">{branch.location}</p>
        <p className="text-lg">Phone: {branch.phone}</p>
        <p className="text-lg">Opening Time: {branch.openingTime}</p>
        <p className="text-lg">Closing Time: {branch.closingTime}</p>
        {session?.user?.role === 'Admin' && (
          <button
            onClick={() => setIsBranchModalOpen(true)}
            className="text-blue-500 hover:text-blue-700 mt-4"
          >
            <FontAwesomeIcon icon={faEdit} /> Edit Branch
          </button>
        )}
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">Services Available</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branch.services.length > 0 ? (
          branch.services.map(service => (
            <ServiceCard
              key={service.id}
              {...service}
              onEdit={() => {
                setSelectedService(service);
                setIsServiceModalOpen(true);
              }}
              onDelete={() => handleDeleteService(service.id)}
              isAdmin={session?.user?.role === 'Admin'}
            />
          ))
        ) : (
          <p className="text-center text-lg">No services available at this branch.</p>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Branches
        </button>
      </div>
      {isBranchModalOpen && branch && (
        <EditBranchDialog
          id={branch.id}
          name={branch.name}
          location={branch.location}
          phone={branch.phone}
          openingTime={branch.openingTime}
          closingTime={branch.closingTime}
          onClose={() => setIsBranchModalOpen(false)}
          onSave={handleEditBranch}
        />
      )}
      {isServiceModalOpen && selectedService && (
        <EditServiceDialog
          id={selectedService.id}
          name={selectedService.name}
          duration={selectedService.duration}
          price={selectedService.price}
          imageUrl={selectedService.imageUrl}
          onClose={() => setIsServiceModalOpen(false)}
          onSave={handleEditService}
        />
      )}
    </div>
  );
}
