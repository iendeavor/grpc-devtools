import React from "react";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import FilterBar from "./header/FilterBar";
import Toolbar from "./header/Toolbar";
import useConfig from "@/presentations/composables/use-config";

const Header = ({
  headerRef,
}: {
  headerRef: React.ClassAttributes<HTMLElement>["ref"] | null;
}) => {
  const [config] = useConfig();

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
