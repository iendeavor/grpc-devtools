import React from "react";
import { useMeasure } from "react-use";
import Header from "./views/Header";
import Main from "./views/Main";

const App = () => {
  const [headerRef, { height }] = useMeasure<HTMLDivElement>();

  return (
    <div className="flex flex-col text-text-secondary bg-background w-screen h-screen overflow-hidden">
      <Header headerRef={headerRef}></Header>
      <Main headerHeight={height}></Main>
    </div>
  );
};

export default App;
