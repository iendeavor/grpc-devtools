import React from "react";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import FilterBar from "./header/FilterBar";
import Toolbar from "./header/Toolbar";

const Header = ({
  headerRef,
}: {
  headerRef: React.ClassAttributes<HTMLElement>["ref"] | null;
}) => {
  return (
    <header ref={headerRef} className="flex flex-col bg-background-elevation-1">
      <Toolbar></Toolbar>
      <HorizontalDivider></HorizontalDivider>
      <FilterBar></FilterBar>
      <HorizontalDivider></HorizontalDivider>
    </header>
  );
};

export default Header;
