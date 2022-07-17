import { RequestRow } from "@/entities/request-row";
import useDetail from "@/presentations/composables/use-detail";
import React from "react";

const RequestRow = ({
  className,
  onClick,
  requestRow,
}: {
  className?: React.InputHTMLAttributes<HTMLDivElement>["className"];
  onClick?: React.InputHTMLAttributes<HTMLDivElement>["onClick"];
  requestRow: RequestRow;
}) => {
  const [detail, setDetail] = useDetail();
  const handleClick: React.DOMAttributes<HTMLDivElement>["onClick"] = (e) => {
    onClick?.(e);

    if (requestRow.id === detail.requestId) return;
    setDetail({
      ...detail,
      requestId: requestRow.id,
    });
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className="px-2">{requestRow.methodName.split("/").pop()}</div>
    </div>
  );
};

export default RequestRow;
