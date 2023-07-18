import LeftArrow from "../assets/img/left-arrow.svg";
import RightArrow from "../assets/img/right-arrow.svg";

function Pagination({ totalPages, page, setPage, goToTop }) {
  // previous button
  function goToPreviousPage() {
    if (page > 1) {
      setPage(page - 1);
      goToTop();
    }
  }

  // next button
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      goToTop();
    }
  };

  // render
  return (
    <div className="pagination">
      <button onClick={goToPreviousPage} disabled={page === 1}>
        <img src={LeftArrow} alt="left-arrow" />
      </button>
      <button onClick={goToNextPage} disabled={page === totalPages}>
        <img src={RightArrow} alt="right-arrow" />
      </button>
    </div>
  );
}

export default Pagination;
