import React, { useEffect, useState } from "react";
import Checkbox from "@/presentations/components/Checkbox";
import { resolve, Tokens } from "@/service-locator";

const PreserveLog = () => {
  const configRepo = resolve(Tokens.ConfigRepo);
  const [shouldPreserveLog, setShouldPreserveLog] = useState(
    configRepo.get().shouldPreserveLog
  );
  useEffect(() => {
    configRepo.patch({
      shouldPreserveLog,
    });
  }, [shouldPreserveLog]);

  return (
    <div className="flex items-center h-[25px]">
      <Checkbox
        checked={shouldPreserveLog}
        onChange={(e) => setShouldPreserveLog(e.target.checked)}
      >
        <span>Preserve log</span>
      </Checkbox>
    </div>
  );
};

export default PreserveLog;
