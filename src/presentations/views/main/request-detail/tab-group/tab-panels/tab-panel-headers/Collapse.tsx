import React, { useCallback, useMemo } from "react";
import { useToggle } from "react-use";
import useDetail from "@/presentations/composables/use-detail";

const Collapse = ({
  title,
  value,
  isFocusIn,
  offsetIndexes,
}: {
  title: string;
  value: Record<string, string>;
  isFocusIn: boolean;
  offsetIndexes: number[];
}) => {
  const [detail, setDetail] = useDetail();

  const [isExpanding, setIsExpanding] = useToggle(true);

  const lines = (Object.keys(value) as (keyof typeof value)[]).reduce<
    readonly (readonly [string, string])[]
  >((acc, key) => {
    const line = [key, value[key]!] as const;
    return [...acc, line];
  }, []);

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
    <div className="text-sm">
      <>
        <div
          className={
            "flex items-center select-none" +
            (detail.headers.focusIndex === offsetIndex
              ? " text-[#cdcdcd]"
              : " text-[#e8eaed]") +
            (isFocusIn && detail.headers.focusIndex === offsetIndex
              ? " bg-[#10629d]"
              : detail.headers.focusIndex === offsetIndex
              ? " bg-[#474747]"
              : "")
          }
          tabIndex={1}
          onClick={handleClickTitle}
        >
          <span
            className={
              "material-symbols-outlined" +
              (isFocusIn && detail.headers.focusIndex === offsetIndex
                ? " text-[#cdcdcd]"
                : " text-[#9aa0a6]")
            }
            onClick={() => setIsExpanding(!isExpanding)}
          >
            {isExpanding ? "arrow_drop_down" : "arrow_right"}
          </span>
          <span className="font-bold -ml-1">
            {title}
            {!isExpanding && <span>&nbsp;({lines.length})</span>}
          </span>
        </div>
        {isExpanding &&
          lines.map((line, index) => {
            return (
              <div
                key={line.join(": ")}
                className={
                  "pt-1 pl-[30px]" +
                  (isFocusIn &&
                  detail.headers.focusIndex === getLineOffsetIndex(index)
                    ? " bg-[#10629d]"
                    : detail.headers.focusIndex === getLineOffsetIndex(index)
                    ? " bg-[#474747]"
                    : "")
                }
                tabIndex={1}
                onClick={() => handleClickLine(index)}
              >
                <span
                  className={
                    "font-bold" +
                    (isFocusIn &&
                    detail.headers.focusIndex === getLineOffsetIndex(index)
                      ? " text-[#cdcdcd]"
                      : " text-[#9aa0a6]")
                  }
                >
                  {line[0]}
                </span>
                <span>:</span>
                <span className="pl-2 text-[#cdcdcd]">{line[1]}</span>
                <br />
              </div>
            );
          })}
      </>
    </div>
  );
};

export default Collapse;
