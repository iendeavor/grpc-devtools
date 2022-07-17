import React from "react";
import Checkbox from "@/presentations/components/Checkbox";
import useConfig from "@/presentations/composables/use-config";

const PreserveLog = () => {
  const [config, setConfig] = useConfig();
  const handleToggleShouldPreserveLog = () => {
    setConfig({
      ...config,
      shouldPreserveLog: !config.shouldPreserveLog,
    });
  };

  return (
    <div className="flex items-center h-[25px]">
      <Checkbox
        checked={config.shouldPreserveLog}
        onChange={handleToggleShouldPreserveLog}
      >
        <span>Preserve log</span>
      </Checkbox>
    </div>
  );
};

export default PreserveLog;
