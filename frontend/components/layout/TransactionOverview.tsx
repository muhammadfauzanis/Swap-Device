import React from 'react';
import { Card, CardContent } from '../ui/card';
import { AiOutlineStock } from 'react-icons/ai';
import { CiShop } from 'react-icons/ci';

interface TransactionOverviewProps {
  title1: string;
  price: string;
  title2: string;
  amount: string;
}

const TransactionOverview = ({
  title1,
  price,
  title2,
  amount,
}: TransactionOverviewProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-8">
      <Card>
        <CardContent>
          <div className="flex items-center gap-x-4 p-2">
            <AiOutlineStock size={50} />
            <div className="">
              <p>{title1}</p>
              <p>{price}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center gap-x-4 p-2">
            <CiShop size={50} />
            <div className="">
              <p>{title2}</p>
              <p>{amount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionOverview;
