import { useNavigate } from "react-router-dom";
import TopRatedTitle from "./TopRatedTitle";
import { useTopRatedApartments } from "../../hooks/useTopRatedApartments";
import { useEffect, useRef } from "react";
import type { Apartment } from "../../types/apartment";

export default function TopRatedWidget() {
  const navigate = useNavigate();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTopRatedApartments();

  // infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const iconSource = `/icons/toprated.svg`;
  const iconSource2 = `/icons/Arrow3.svg`;

  return (
    <div className="toprated-apartments-widget apartment-grid-3">
      <div className="toprated-apartments-widget-header">
        <img
          className="toprated-apartments-widget-header-icon"
          src={iconSource}
          alt="Top rated"
        />
        <div className="toprated-apartments-widget-header-title">
          Top rated accommodations
        </div>
      </div>

      <div className="toprated-apartments-widget-body">
        {data?.pages.flatMap((page) =>
          page.items.map((apartment: Apartment) => (
            <TopRatedTitle
              key={apartment.id}
              apartment={apartment}
            />
          ))
        )}

        <div ref={loaderRef} style={{ height: "40px" }} />
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>

      <div
        className="toprated-apartments-widget-footer"
        onClick={() => navigate("/top-rated")}
      >
        See all top rated accommodations 
        <img
          className="toprated-apartments-widget-header-icon"
          src={iconSource2}
          style={{ marginLeft: "8px" }}
          alt="Right arrow"
        />
      </div>
    </div>
  );
}
