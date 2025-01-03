import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '../ui/card';
import { FiEye } from 'react-icons/fi';

const products = [
  {
    code: 'SD001',
    category: 'iPhone',
    model: 'iPhone 15 Pro',
    price: 'IDR 15.000.000',
    status: 'Terjual',
    tanggal: '25 Des 2024',
  },
  {
    code: 'SD002',
    category: 'iPad',
    model: 'iPad Pro 11 Inch',
    price: 'IDR 25.000.000',
    status: 'Terjual',
    tanggal: '25 Des 2024',
  },
  {
    code: 'SD003',
    category: 'Airpods',
    model: 'Airpods 4 ANC',
    price: 'IDR 3.000.000',
    status: 'Terjual',
    tanggal: '25 Des 2024',
  },
  {
    code: 'SD003',
    category: 'Mac',
    model: 'Macbook Pro M3 Max 14 Inch',
    price: 'IDR 33.000.000',
    status: 'Terjual',
    tanggal: '25 Des 2024',
  },
];
const SellingHistory = () => {
  return (
    <Card className="mt-4">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell className="font-medium">{product.code}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.tanggal}</TableCell>
                <TableCell>
                  <button className="cursor-pointer">
                    <FiEye size={17} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SellingHistory;
