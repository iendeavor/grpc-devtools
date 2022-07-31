import React, { useCallback, useMemo } from "react";
import { useToggle } from "react-use";
import useDetail from "@/presentations/composables/use-detail";

const Collapse = ({
  title,
  value,
  isFocusIn,
  offsetIndexes,
  displayCountOnCollapse,
}: {
  title: string;
  value: Record<string, string>;
  isFocusIn: boolean;
  offsetIndexes: number[];
  displayCountOnCollapse?: boolean;
}) => {
  const [detail, setDetail] = useDetail();

  const [isExpanding, setIsExpanding] = useToggle(true);

  const lines = useMemo(
    () =>
      (Object.keys(value) as (keyof typeof value)[])
        .reduce<readonly (readonly [string, string])[]>((acc, key) => {
          const line = [key, value[key]!] as const;
          return [...acc, line];
        }, [])
        .slice()
        .sort((a, b) => a[0].localeCompare(b[0])),
    [value]
  );

  const offsetIndex = useMemo(() => {
    return offsetIndexes.reduce((acc, offset) => acc + offset + 1, 0) - 1;
  }, [offsetIndexes]);

  const handleClickTitle = () => {
    setDetail({
      ...detail,
      headers: { ...detail.headers, focusIndex: offsetIndex },
    });
  };

  const getLineOffsetIndex = (index: number) => {
    return offsetIndex + index + 1;
  };
  const handleClickLine = useCallback(
    (index: number) => {
      setDetail({
        ...detail,
        headers: {
          ...detail.headers,
          focusIndex: getLineOffsetIndex(index),
        },
      });
    },
    [detail]
  );

  return (
    <div className="cursor-default">
      <>
        <div
          className={
            "flex items-center select-none" +
            (isFocusIn && detail.headers.focusIndex === offsetIndex
              ? " text-[#ffffff] dark:text-[#cdcdcd]"
              : detail.headers.focusIndex === offsetIndex
              ? " text-[#5f6367] dark:text-[#e8eaed]"
              : " text-[#202124] dark:text-[#e8eaed]") +
            (isFocusIn && detail.headers.focusIndex === offsetIndex
              ? " bg-[#1b73e8] dark:bg-[#10629d]"
              : detail.headers.focusIndex === offsetIndex
              ? " bg-[#dadada] dark:bg-[#474747]"
              : "")
          }
          tabIndex={1}
          onClick={handleClickTitle}
        >
          <span
            className={
              "material-symbols-outlined" +
              (isFocusIn && detail.headers.focusIndex === offsetIndex
                ? " text-[#ffffff] dark:text-[#cdcdcd]"
                : " text-[#5f6367] dark:text-[#9aa0a6]")
            }
            onClick={() => setIsExpanding(!isExpanding)}
          >
            {isExpanding ? "arrow_drop_down" : "arrow_right"}
          </span>
          <span className="font-bold -ml-1">
            {title}
            {!isExpanding && displayCountOnCollapse && (
              <span>&nbsp;({lines.length})</span>
            )}
          </span>
        </div>
        {isExpanding &&
          lines.map((line, index) => {
            return (
              <div
                key={line.join(": ")}
                className={
                  "pl-[30px] leading-[2]" +
                  (isFocusIn &&
                  detail.headers.focusIndex === getLineOffsetIndex(index)
                    ? " bg-[#1b73e8] dark:bg-[#10629d]"
                    : detail.headers.focusIndex === getLineOffsetIndex(index)
                    ? " bg-[#dadada] dark:bg-[#474747]"
                    : "")
                }
                tabIndex={1}
                onClick={() => handleClickLine(index)}
              >
                <div
                  className={
                    isFocusIn &&
                    detail.headers.focusIndex === getLineOffsetIndex(index)
                      ? " text-[#ffffff] dark:text-[#cdcdcd]"
                      : " text-[#5f6367] dark:text-[#9aa0a6]"
                  }
                >
                  <span className="font-bold">{line[0]}:&nbsp;&nbsp;</span>
                  <span
                    className={
                      isFocusIn &&
                      detail.headers.focusIndex === getLineOffsetIndex(index)
                        ? "text-[#ffffff] dark:text-[#cdcdcd]"
                        : "text-[#303942] dark:text-[#cdcdcd]"
                    }
                  >
                    {line[1]}
                  </span>
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
};

export default Collapse;
