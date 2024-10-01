'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const SidebarProduct = () => {
  const [showAll, setShowAll] = useState(false); // State to control whether all checkboxes are shown

  // List of checkboxes (example data, replace with actual checkbox values)
  const checkboxes = [
    'iPhone 14',
    'iPhone 13',
    'iPhone 12',
    'iPhone 11',
    'iPhone X',
    'iPhone 8',
    'iPhone 7',
    'iPhone 6',
  ];

  // Number of checkboxes to display initially
  const initialDisplayCount = 3;

  // Toggle show all state
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Card className="w-full lg:max-w-md">
      <CardHeader>
        <CardTitle>Filter</CardTitle>
        <CardDescription>Customize your product search.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <RadioGroup defaultValue="" className="space-y-1.5">
          <Label htmlFor="Condition" className="font-bold">
            Condition
          </Label>
          <div className="flex gap-x-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Brand New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Used</Label>
            </div>
          </div>
        </RadioGroup>

        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className="pb-3 font-bold">
                Price Range (IDR)
              </Label>
              <Input id="name" placeholder="Minimum Price" />
              <Input id="name" placeholder="Maximum Price" />
            </div>
          </div>
        </form>

        {/* Display checkboxes */}
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name" className="pb-3 font-bold">
            Models
          </Label>

          {(showAll
            ? checkboxes
            : checkboxes.slice(0, initialDisplayCount)
          ).map((label, index) => (
            <div key={index} className="flex items-center gap-x-3">
              <Checkbox id={`checkbox-${index}`} />
              <label
                htmlFor={`checkbox-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            </div>
          ))}
        </div>

        {/* Show/Hide button */}
        <Button
          variant="link"
          onClick={toggleShowAll}
          className="flex justify-start w-min font-bold "
        >
          {showAll ? 'Show Less' : 'Show All'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SidebarProduct;
