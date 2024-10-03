interface CheckoutInformationProps {
  detailInformation: string;
  price: string;
}

const CheckoutInformation = ({
  detailInformation,
  price,
}: CheckoutInformationProps) => {
  return (
    <div className="flex justify-between items-center space-y-2">
      <p>{detailInformation}</p>
      <p>{price}</p>
    </div>
  );
};

export default CheckoutInformation;
