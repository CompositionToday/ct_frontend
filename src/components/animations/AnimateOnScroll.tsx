import React, { useState, useEffect, useRef, ReactNode } from "react";

function useElementOnScreen(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [isIntersecting, setIsIntersecting] = useState(true);
  useEffect(() => {
    let observerRefValue = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}

type PropsWithChildren = {
  children: ReactNode;
};

export const AnimateIn: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: onScreen ? 1 : 0,
        translate: onScreen ? "none" : "0 3rem",
        transition: "600ms ease-in-out",
      }}
    >
      {children}
    </div>
  );
};
