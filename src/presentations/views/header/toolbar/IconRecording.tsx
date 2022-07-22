import useConfig from "@/presentations/composables/use-config";
import React, { useState } from "react";

const IconRecording = () => {
  const [isHovering, setIsHovering] = useState(false);

  const [config, setConfig] = useConfig();
  const handleToggleShouldRecord = () => {
    setConfig({
      ...config,
      shouldRecord: !config.shouldRecord,
    });
  };

  return (
    <button
      className="flex items-center h-[26px] px-1 cursor-default focus-visible:bg-background-elevation-2"
      onClick={handleToggleShouldRecord}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "relative flex justify-center items-center rounded-full transition-colors" +
          (config.shouldRecord
            ? " bg-[#f18b82] w-[12px] h-[12px] m-[2.5px]"
            : " w-[13px] h-[13px] m-[2px]" +
              (isHovering ? " bg-[#e8eaed]" : " bg-[#919191]"))
        }
      >
        {config.shouldRecord ? (
          <div className="absolute rounded-full w-4 h-4 bg-text-error opacity-30 blur-[1px]"></div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default IconRecording;
