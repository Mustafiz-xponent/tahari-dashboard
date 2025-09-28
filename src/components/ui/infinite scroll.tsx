"use client";

import * as React from "react";

// Define a type for elements that can accept className
type ElementWithClassName = React.ReactElement<{
  className?: string;
}>;

// Define props interface
interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  next: () => void | Promise<void>;
  threshold?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  reverse?: boolean;
  children?: React.ReactNode;
  triggerClassName?: string; // Optional Tailwind CSS class for the trigger element
}

/**
 * InfiniteScroll component for triggering a callback when an element enters the viewport.
 * Useful for lazy-loading data, such as paginated product lists or images in an e-commerce app.
 */
export default function InfiniteScroll({
  isLoading,
  hasMore,
  next,
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  reverse = false,
  children,
  triggerClassName = "",
}: InfiniteScrollProps) {
  const observer = React.useRef<IntersectionObserver | null>(null);

  // Validate and normalize threshold
  const safeThreshold = React.useMemo(() => {
    if (threshold < 0 || threshold > 1) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Threshold should be between 0 and 1. Received: ${threshold}. Using default: 0.1`
        );
      }
      return 0.1;
    }
    return threshold;
  }, [threshold]);

  // Callback for observing the trigger element
  const observerRef = React.useCallback(
    (element: HTMLElement | null) => {
      if (isLoading || !element) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            next();
          }
        },
        { root, rootMargin, threshold: safeThreshold }
      );

      observer.current.observe(element);

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    },
    [hasMore, isLoading, next, safeThreshold, root, rootMargin]
  );

  // Flatten and filter valid children
  const flattenChildren = React.useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is ElementWithClassName => React.isValidElement(child)
      ),
    [children]
  );

  // Handle empty or invalid children
  if (flattenChildren.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.warn("InfiniteScroll requires valid React elements as children");
    }
    return <>{children}</>;
  }

  return (
    <>
      {flattenChildren.map((child, index) => {
        const isTrigger = reverse
          ? index === 0
          : index === flattenChildren.length - 1;

        if (isTrigger) {
          return (
            <div
              key={child.key ?? index}
              ref={observerRef}
              className={`infinite-scroll-trigger ${triggerClassName}`}
              aria-hidden="true"
            >
              {React.cloneElement(child, {
                className: [
                  child.props.className || "",
                  "w-full", // Ensure full-width for consistency
                ]
                  .filter(Boolean)
                  .join(" "),
              })}
            </div>
          );
        }

        return (
          <React.Fragment key={child.key ?? index}>{child}</React.Fragment>
        );
      })}
    </>
  );
}
