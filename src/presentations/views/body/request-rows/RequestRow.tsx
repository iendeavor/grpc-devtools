import { RequestRow } from "@/entities/request-row";
import { resolve, Tokens } from "@/service-locator";
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
  const detailInMemoryDataSource = resolve(Tokens.DetailInMemoryDataSource);
  const handleClick: React.DOMAttributes<HTMLDivElement>["onClick"] = (e) => {
    if (requestRow.id !== detailInMemoryDataSource.get().requestId) {
      detailInMemoryDataSource.patch({
        requestId: requestRow.id,
      });
    }
    onClick?.(e);
  };

  return (
    <div className={className} onClick={handleClick}>
      <div className="px-2">{requestRow.methodName.split("/").pop()}</div>
    </div>
  );
};

export default RequestRow;
