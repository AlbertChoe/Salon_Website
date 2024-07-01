"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
  imageUrl?: string;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean; // Add isAdmin prop
}

const ServiceCard: React.FC<Service> = ({ id, name, duration, price, imageUrl, onEdit, onDelete, isAdmin }) => {
  return (
    <div key={id} className="shadow-lg p-6">
      {imageUrl && (
        <div
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '300px'
          }}
        ></div>
      )}
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-yellow-500 mt-2">IDR {price}</p>
      <p className="mt-2 text-gray-700">{duration} minutes</p>
      {isAdmin && (
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
