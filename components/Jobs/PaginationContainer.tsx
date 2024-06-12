'use client';

import { ChevronLeft, ChevronRight, icons } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
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

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? 'default' : 'outline'}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // first page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // dots
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      );
    }

    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    // one after current page
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({ page: currentPage + 1, activeClass: false })
      );
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-2">
          ...
        </Button>
      );
    }

    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );

    return pageButtons;
  };

  return (
    <div className="flex gap-x-2">
      <Button
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
        prev
      </Button>
      {renderPageButtons()}
      <Button
        variant="outline"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <ChevronRight />
      </Button>
    </div>
  );
}
