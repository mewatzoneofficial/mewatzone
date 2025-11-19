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
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav aria-label="Page navigation" className="pagination-container">
      <ul className="pagination-list">
        {/* Previous */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
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
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => onPageChange(number)}>
                {number}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>

      <style jsx>{`
        .pagination-container {
          display: flex;
          justify-content: flex-end; /* Align right, change to center or flex-start as needed */
          padding: 10px 0;
          font-family: Arial, sans-serif;
        }
        .pagination-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex; /* Make horizontal */
          gap: 6px;
        }
        .page-item {
          display: inline;
        }
        .page-link {
          border: 1px solid #ddd;
          padding: 6px 12px;
          cursor: pointer;
          background-color: #bcbcbcff;
          color: #2c2d2fff;
          border-radius: 4px;
          min-width: 36px;
          text-align: center;
          user-select: none;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .page-link:hover:not(:disabled) {
          background-color: #e9ecef;
        }
        .page-item.active .page-link {
          background-color: #4285c9ff;
          color: white;
          border-color: #fdfeffff;
          cursor: default;
        }
        .page-item.disabled .page-link {
          color: #6c757d;
          cursor: not-allowed;
          background-color: #f8f9fa;
          border-color: #ddd;
        }
      `}</style>
    </nav>
  );
};

export default Pagination;
