import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

export default function Pagination({
  // pageNumbers,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const generatePageNumbers = () => {
    const visiblePageCount = 5;
    const halfVisiblePages = Math.floor(visiblePageCount / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();

  const goToEndPage = () => {
    // setCurrentPage(totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
      window.scrollTo(0, 0);
    }
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };
  return (
    // mt-10
    <div className="flex items-center gap-3">
      {currentPage > 3 && (
        <div
          style={{
            color: currentPage === 1 ? "#545454" : "#2E2E2E",
          }}
          disabled={currentPage === 1}
          onClick={goToFirstPage}
          className="left flex items-center justify-center rounded bg-gray-300 px-2 py-1.5 text-sm text-[#2E2E2E] hover:bg-blue-600"

          // className="left text-[#2E2E2E] text-[0.8rem] flex items-center justify-center font-medium"
        >
          <ChevronsLeft className="size-5" />
        </div>
      )}
      <button
        style={{
          color: currentPage === 1 ? "#545454" : "#2E2E2E",
        }}
        disabled={currentPage === 1}
        onClick={goToPreviousPage}
        className="left flex items-center justify-center rounded bg-gray-300 px-2 py-1.5 text-[0.84rem] font-medium text-[#2E2E2E] hover:bg-gray-400"
      >
        <ChevronLeft className="size-5" />
      </button>

      {pageNumbers.map((page) => (
        <button
          style={{
            backgroundColor: currentPage === page ? "#3b82f6" : "",
            color: currentPage === page ? "#fff" : "",
          }}
          className="left flex items-center justify-center rounded bg-gray-300 px-3 py-1.5 text-sm text-[#2E2E2E] hover:bg-blue-600"
          key={page}
          onClick={() => {
            setCurrentPage(page);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      <button
        style={{
          color: currentPage === totalPages ? "#545454" : "#2E2E2E",
        }}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="right flex items-center justify-center rounded bg-gray-300 px-2 py-1.5 text-[0.84rem] font-medium text-[#2E2E2E] hover:bg-gray-400"
      >
        <ChevronRight className="size-5" />
      </button>
      {totalPages > 7 && totalPages - currentPage > 3 && (
        <button
          style={{
            color: currentPage === totalPages ? "#545454" : "#2E2E2E",
          }}
          onClick={goToEndPage}
          disabled={currentPage === totalPages}
          className="left flex items-center justify-center rounded bg-gray-300 px-2 py-1.5 text-sm text-[#2E2E2E] hover:bg-blue-600"

          // className="right flex items-center justify-center rounded-full text-[0.8rem] font-medium text-[#2E2E2E]"
        >
          {/* ... End */}
          <ChevronsRight className="size-5" />
        </button>
      )}
    </div>
  );
}
