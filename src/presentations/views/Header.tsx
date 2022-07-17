import React, { useEffect, useState } from "react";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import FilterBar from "./header/FilterBar";
import Toolbar from "./header/Toolbar";
import { resolve, Tokens } from "@/service-locator";

const Header = ({
  headerRef,
}: {
  headerRef: React.ClassAttributes<HTMLElement>["ref"] | null;
}) => {
  const configRepo = resolve(Tokens.ConfigRepo);
  const [config, setConfig] = useState(configRepo.get());
  useEffect(() => {
    const subscription = configRepo.subscribe((config) => {
      setConfig(config);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header ref={headerRef} className="flex flex-col bg-background-elevation-1">
      <Toolbar></Toolbar>
      <HorizontalDivider></HorizontalDivider>
      {config.shouldShowFilterBar && (
        <>
          <FilterBar></FilterBar>
          <HorizontalDivider></HorizontalDivider>
        </>
      )}
    </header>
  );
};

export default Header;
