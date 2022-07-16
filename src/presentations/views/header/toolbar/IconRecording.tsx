import { resolve, Tokens } from "@/service-locator";
import React, { useEffect, useState } from "react";

const IconRecording = () => {
  const [isHovering, setIsHovering] = useState(false);

  const configRepo = resolve(Tokens.ConfigRepo);
  const [shouldRecord, setShouldRecord] = useState(
    configRepo.get().shouldRecord
  );
  useEffect(() => {
    const subscription = configRepo.subscribe((config) => {
      if (config.shouldRecord === shouldRecord) return;
      setShouldRecord(config.shouldRecord);
    });
    return subscription.unsubscribe;
  }, []);
  useEffect(() => {
    configRepo.patch({
      shouldRecord,
    });
  }, [shouldRecord]);

  return (
    <button
      className="flex items-center h-[26px] px-1 cursor-default focus-visible:bg-background-elevation-2"
      onClick={() => setShouldRecord(!shouldRecord)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={
          "relative flex justify-center items-center rounded-full transition-colors" +
          (shouldRecord
            ? " bg-text-error w-[12px] h-[12px] m-[2.5px]"
            : " w-[13px] h-[13px] m-[2px]" +
              (isHovering ? " bg-text-primary" : " bg-text-secondary"))
        }
      >
        {shouldRecord ? (
          <div className="absolute rounded-full w-4 h-4 bg-text-error opacity-30 blur-[1px]"></div>
        ) : (
          <></>
        )}
      </div>
    </button>
  );
};

export default IconRecording;
