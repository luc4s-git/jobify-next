'use client';

import { ChevronLeft, ChevronRight, icons } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationContainer({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      jobStatus: searchParams.get('jobStatus') || '',
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) nextPage = 1;
    handlePageChange(nextPage);
  };

  const handlePrevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) prevPage = totalPages;
    handlePageChange(prevPage);
  };

  return (
    <div className="flex gap-x-2">
      <Button variant="outline" onClick={() => handlePrevPage()}>
        <ChevronLeft />
        prev
      </Button>
      {pageButtons.map((page) => {
        return (
          <Button
            key={page}
            size={'icon'}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
      <Button variant="outline" onClick={() => handleNextPage()}>
        next
        <ChevronRight />
      </Button>
    </div>
  );
}
