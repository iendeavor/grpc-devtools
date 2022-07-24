import React, { useCallback, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

const VirtualList = ({
  data,
  currentIndex,
  renderItem,
  style,
  onDone,
}: {
  data: unknown[];
  currentIndex: number;
  renderItem: (index: number) => JSX.Element;
  style?: React.CSSProperties;
  onDone?: (index: number) => void;
}) => {
  const virtusoRef = useRef<VirtuosoHandle>(null);
  const [listRef, setListRef] = useState<HTMLElement | Window | null>(null);
  const handleScrollerKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "ArrowUp") {
        e.preventDefault();
        const firstIndex = 0;
        virtusoRef.current?.scrollIntoView({
          index: firstIndex,
          behavior: "auto",
          done: () => onDone?.(firstIndex),
        });
      } else if (e.metaKey && e.key === "ArrowDown") {
        e.preventDefault();
        const lastIndex = data.length - 1;
        virtusoRef.current?.scrollIntoView({
          index: lastIndex,
          behavior: "auto",
          done: () => onDone?.(lastIndex),
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === -1) return;
        if (currentIndex === 0) return;
        const prevIndex = currentIndex - 1;

        virtusoRef.current?.scrollIntoView({
          index: prevIndex,
          behavior: "auto",
          done: () => onDone?.(prevIndex),
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === -1) return;
        if (currentIndex === data.length - 1) return;
        const nextIndex = currentIndex + 1;

        virtusoRef.current?.scrollIntoView({
          index: nextIndex,
          behavior: "auto",
          done: () => onDone?.(nextIndex),
        });
      }
    },
    [virtusoRef, data, onDone]
  );
  const scrollerRef = React.useCallback(
    (element: HTMLElement | Window | null) => {
      if (element) {
        setListRef(element);
        listRef?.addEventListener("keydown", handleScrollerKeydown as any);
      } else {
        listRef?.removeEventListener("keydown", handleScrollerKeydown as any);
      }
    },
    [handleScrollerKeydown]
  );

  return (
    <Virtuoso
      ref={virtusoRef}
      style={style}
      totalCount={data.length}
      itemContent={renderItem}
      scrollerRef={scrollerRef}
    />
  );
};
export default VirtualList;
