import React from "react";
import { useMeasure } from "react-use";
import Header from "./views/Header";
import Main from "./views/Main";

const App = () => {
  const [headerRef, { height }] = useMeasure<HTMLDivElement>();

  return (
    <div className="flex flex-col bg-[#ffffff] dark:bg-[#202124] w-screen h-screen overflow-hidden text-xs">
      <Header headerRef={headerRef}></Header>
      <Main headerHeight={height}></Main>
    </div>
  );
};

export default App;
