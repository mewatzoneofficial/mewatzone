"use client";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= half + 1) {
        for (let i = 1; i <= maxVisible - 2; i++) pages.push(i);
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - half) {
        pages.push(1, "...");
        for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++)
          pages.push(i);
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav
      aria-label="Page navigation"
      className="d-flex justify-content-center mt-3"
    >
      <ul className="pagination">
        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <li key={`ellipsis-${index}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={`page-${number}-${index}`}
              className={`page-item ${
                currentPage === number ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
