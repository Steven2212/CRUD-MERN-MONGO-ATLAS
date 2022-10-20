import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="pagination-box">
        <nav aria-label="...">
          <ul className="pagination">
            
            {/* Previous Button */}
            
            <li className="page-item">
              <Link
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {" "}
                Prev
              </Link>
            </li>

            {/* Page Numbers */}

            <div>
              {pages.map((page, index) => {
                return (
                  <button
                    id="pagination"
                    key={index}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

              {/* Next Button */}
            
            <li className="page-item">
              <Link
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {" "}
                Next
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
