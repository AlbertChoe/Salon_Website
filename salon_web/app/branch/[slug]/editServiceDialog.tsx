"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
  imageUrl?: string;
  onSave: (service: Partial<Service>) => void;
  onClose: () => void;
}

const EditServiceDialog: React.FC<Service> = ({ id, name, duration, price, imageUrl, onSave, onClose }) => {
  const [serviceName, setServiceName] = useState(name);
  const [serviceDuration, setServiceDuration] = useState(duration);
  const [servicePrice, setServicePrice] = useState(price);

  const handleSave = () => {
    onSave({ id, name: serviceName, duration: serviceDuration, price: servicePrice });
    onClose(); 
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Make changes to the service details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              Name
            </Label>
            <Input
              id="serviceName"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceDuration" className="text-right">
              Duration (minutes)
            </Label>
            <Input
              id="serviceDuration"
              type="number"
              value={serviceDuration}
              onChange={(e) => setServiceDuration(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePrice" className="text-right">
              Price
            </Label>
            <Input
              id="servicePrice"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} type="button">Save changes</Button>
          <Button onClick={onClose} type="button" variant="secondary">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceDialog;
