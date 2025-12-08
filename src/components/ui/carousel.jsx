import React, { useRef, useState, useEffect, createContext, useContext, useCallback } from "react";
import './carousel.css';

const CarouselContext = createContext(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel>");
  return context;
}

export const Carousel = React.forwardRef(({ orientation = "horizontal", className = "", children, ...props }, ref) => {
  const carouselRef = useRef(null);
  const [scrollPos, setScrollPos] = useState({ canScrollPrev: false, canScrollNext: true });

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: orientation === "horizontal" ? -carouselRef.current.clientWidth : 0,
        top: orientation === "vertical" ? -carouselRef.current.clientHeight : 0,
        behavior: "smooth",
      });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: orientation === "horizontal" ? carouselRef.current.clientWidth : 0,
        top: orientation === "vertical" ? carouselRef.current.clientHeight : 0,
        behavior: "smooth",
      });
    }
  };

  const onScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setScrollPos({
      canScrollPrev: el.scrollLeft > 0 || el.scrollTop > 0,
      canScrollNext: orientation === "horizontal"
        ? el.scrollLeft + el.clientWidth < el.scrollWidth
        : el.scrollTop + el.clientHeight < el.scrollHeight,
    });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) el.addEventListener("scroll", onScroll);
    return () => el && el.removeEventListener("scroll", onScroll);
  }, [orientation]);

  return (
    <CarouselContext.Provider value={{ carouselRef, orientation, scrollPrev, scrollNext, ...scrollPos }}>
      <div ref={ref} className={`carousel ${className}`} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
});

export const CarouselContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className={`carousel-content ${orientation}`} {...props}>
      <div ref={ref} className={`carousel-track ${className} ${orientation}`}>
        {children}
      </div>
    </div>
  );
});

export const CarouselItem = React.forwardRef(({ className = "", ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div ref={ref} className={`carousel-item ${orientation} ${className}`} {...props} />
  );
});

export const CarouselPrevious = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button ref={ref} className={`carousel-prev ${className}`} onClick={scrollPrev} disabled={!canScrollPrev} {...props}>
      {children || "<"}
    </button>
  );
});

export const CarouselNext = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button ref={ref} className={`carousel-next ${className}`} onClick={scrollNext} disabled={!canScrollNext} {...props}>
      {children || ">"}
    </button>
  );
});
