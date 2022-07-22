export const getClassName = ({
  isWindowFocus,
  isActive,
  isError,
  isOdd,
}: {
  isWindowFocus: boolean;
  isActive: boolean;
  isError: boolean;
  isOdd: boolean;
}): string[] => {
  const flagToBinary = {
    isWindowFocus: 8,
    isActive: 4,
    isError: 2,
    isOdd: 1,
  };
  const binary =
    (isWindowFocus ? flagToBinary["isWindowFocus"] : 0) +
    (isActive ? flagToBinary["isActive"] : 0) +
    (isError ? flagToBinary["isError"] : 0) +
    (isOdd ? flagToBinary["isOdd"] : 0);

  switch (binary) {
    case 0:
      return ["text-[#bec6cf]", "bg-[#292929]"];
    case 1:
      return ["text-[#bec6cf]", "bg-[#242424]"];
    case 2:
      return ["text-[#ed4f4c]", "bg-[#292929]"];
    case 3:
      return ["text-[#ed4f4c]", "bg-[#242424]"];
    case 4:
      return ["text-[#bec6cf]", "bg-[#454545]"];
    case 5:
      return ["text-[#bec6cf]", "bg-[#454545]"];
    case 6:
      return ["text-[#ed4f4c]", "bg-[#454545]"];
    case 7:
      return ["text-[#ed4f4c]", "bg-[#454545]"];
    case 8:
      return ["text-[#bec6cf]", "bg-[#292929]"];
    case 9:
      return ["text-[#bec6cf]", "bg-[#242424]"];
    case 10:
      return ["text-[#ed4f4c]", "bg-[#292929]"];
    case 11:
      return ["text-[#ed4f4c]", "bg-[#242424]"];
    case 12:
      return ["text-[#cdcdcd]", "bg-[#10629d]"];
    case 13:
      return ["text-[#cdcdcd]", "bg-[#10629d]"];
    case 14:
      return ["text-[#ed4f4c]", "bg-[#482422]"];
    case 15:
      return ["text-[#ed4f4c]", "bg-[#482422]"];
  }

  return [];
};
