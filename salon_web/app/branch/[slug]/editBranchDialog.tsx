"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  onSave: (branch: Partial<Branch>) => void;
  onClose: () => void;
}

const EditBranchDialog: React.FC<Branch> = ({ id, name, location, phone, openingTime, closingTime, onSave, onClose }) => {
  const [branchName, setBranchName] = useState(name);
  const [branchLocation, setBranchLocation] = useState(location);
  const [branchPhone, setBranchPhone] = useState(phone);
  const [branchOpeningTime, setBranchOpeningTime] = useState(openingTime);
  const [branchClosingTime, setBranchClosingTime] = useState(closingTime);

  const handleSave = () => {
    onSave({ id, name: branchName, location: branchLocation, phone: branchPhone, openingTime: branchOpeningTime, closingTime: branchClosingTime });
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Branch</DialogTitle>
          <DialogDescription>
            Make changes to the branch details here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchName" className="text-right">
              Name
            </Label>
            <Input
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchLocation" className="text-right">
              Location
            </Label>
            <Input
              id="branchLocation"
              value={branchLocation}
              onChange={(e) => setBranchLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchPhone" className="text-right">
              Phone
            </Label>
            <Input
              id="branchPhone"
              value={branchPhone}
              onChange={(e) => setBranchPhone(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchOpeningTime" className="text-right">
              Opening Time
            </Label>
            <Input
              id="branchOpeningTime"
              type="time"
              value={branchOpeningTime}
              onChange={(e) => setBranchOpeningTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="branchClosingTime" className="text-right">
              Closing Time
            </Label>
            <Input
              id="branchClosingTime"
              type="time"
              value={branchClosingTime}
              onChange={(e) => setBranchClosingTime(e.target.value)}
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

export default EditBranchDialog;
