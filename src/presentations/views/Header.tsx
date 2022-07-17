import React, { useEffect } from "react";
import HorizontalDivider from "@/presentations/components/HorizontalDivider";
import FilterBar from "./header/FilterBar";
import Toolbar from "./header/Toolbar";
import useConfig from "@/presentations/composables/use-config";
import useFilter from "@/presentations/composables/use-filter";
import useDetail from "@/presentations/composables/use-detail";

const Header = ({
  headerRef,
}: {
  headerRef: React.ClassAttributes<HTMLElement>["ref"] | null;
}) => {
  const [config] = useConfig();

  const [filter] = useFilter();
  const [detail, setDetail] = useDetail();
  useEffect(() => {
    setDetail({
      ...detail,
      requestId: null,
    });
  }, [filter]);

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
