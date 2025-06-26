import React from "react";

const Pagination = ({ totalEmployees, limit, currentPage, changePage }) => {
  const totalPages = Math.ceil(totalEmployees / limit);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => changePage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="mt-4" aria-label="Pagination Navigation">
      <ul className="pagination justify-content-center flex-wrap gap-1">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            &laquo;
          </button>
        </li>

        {renderPageNumbers()}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
