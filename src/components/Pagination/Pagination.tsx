import { FC, useMemo } from "react";
import prev from "../../assets/images/prev btn.svg";
import next from "../../assets/images/next btn.svg";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  pageCount: number; 
  totalCount: number; 
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageCount,
  totalCount,
}) => {
  const safeTotalPages = Math.max(1, totalPages);

  const goToPage = (page: number) => {
    if (page < 1 || page > safeTotalPages) return;
    onPageChange(page);
  };

  const goPrev = () => goToPage(currentPage - 1);
  const goNext = () => goToPage(currentPage + 1);

  const pageItems = useMemo(() => {
    const items: Array<number | "..."> = [];

    for (let num = 1; num <= safeTotalPages; num++) {
      const isEdge = num === 1 || num === safeTotalPages;
      const isNear = num >= currentPage - 1 && num <= currentPage + 1;

      if (isEdge || isNear) {
        items.push(num);
        continue;
      }

      const shouldShowEllipsis =
        num === currentPage - 2 || num === currentPage + 2;

      if (shouldShowEllipsis) items.push("...");
    }

    return items.filter((item, idx, arr) => item !== "..." || arr[idx - 1] !== "...");
  }, [currentPage, safeTotalPages]);

  

  return (
    <div className="pagination">
      <div className="count-holder">
        <p>showing</p>
        <div className="count">
          <span>{pageCount}</span>
        </div>
        <span>Out of {totalCount}</span>
      </div>

      <div className="prev">
        <img
          src={prev}
          alt="prev"
          onClick={goPrev}
          style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1 }}
        />

        {pageItems.map((item, idx) => {
          if (item === "...") return <span key={`ellipsis-${idx}`}>...</span>;

          const pageNum = item;
          return (
            <span
              key={pageNum}
              className={currentPage === pageNum ? "active-page" : ""}
              onClick={() => goToPage(pageNum)}
              style={{ cursor: "pointer" }}
            >
              {pageNum}
            </span>
          );
        })}

        <img
          src={next}
          alt="next"
          onClick={goNext}
          style={{
            cursor: currentPage === safeTotalPages ? "not-allowed" : "pointer",
            opacity: currentPage === safeTotalPages ? 0.5 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
