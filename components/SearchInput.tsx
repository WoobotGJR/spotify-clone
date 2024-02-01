'use client';

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import Input from './Input';

interface SearchInputProps {}
const SearchInput: React.FC<SearchInputProps> = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = queryString.stringifyUrl(
      {
        url: '/search',
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search..."
    />
  );
};
export default SearchInput;
