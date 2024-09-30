import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SortingProductBox = () => {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Featured Item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Featured Item</SelectLabel>
          <SelectItem value="best-match">Best Match</SelectItem>
          <SelectItem value="newly-added">Newly Added</SelectItem>
          <SelectItem value="highest-lowest">Highest to Lowest</SelectItem>
          <SelectItem value="lowest-highest">Lowest to Highest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortingProductBox;
