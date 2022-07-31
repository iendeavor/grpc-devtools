import { getClassName } from "../get-class-name";

test("isWindowFocus=false, active=false, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#f5f5f5] dark:bg-[#292929]",
  ]);
});

test("isWindowFocus=false, active=false, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#ffffff] dark:bg-[#242424]",
  ]);
});

test("isWindowFocus=false, active=false, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#f5f5f5] dark:bg-[#292929]",
  ]);
});

test("isWindowFocus=false, active=false, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#ffffff] dark:bg-[#242424]",
  ]);
});

test("isWindowFocus=false, active=true, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#dadcd0] dark:bg-[#454545]",
  ]);
});

test("isWindowFocus=false, active=true, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#dadcd0] dark:bg-[#454545]",
  ]);
});

test("isWindowFocus=false, active=true, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#dadcd0] dark:bg-[#454545]",
  ]);
});

test("isWindowFocus=false, active=true, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#dadcd0] dark:bg-[#454545]",
  ]);
});

/// ----

test("isWindowFocus=true, active=false, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#f5f5f5] dark:bg-[#292929]",
  ]);
});

test("isWindowFocus=true, active=false, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#303942] dark:text-[#bec6cf]",
    "bg-[#ffffff] dark:bg-[#242424]",
  ]);
});

test("isWindowFocus=true, active=false, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#f5f5f5] dark:bg-[#292929]",
  ]);
});

test("isWindowFocus=true, active=false, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#ffffff] dark:bg-[#242424]",
  ]);
});

test("isWindowFocus=true, active=true, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#ffffff] dark:text-[#cdcdcd]",
    "bg-[#1b73e8] dark:bg-[#10629d]",
  ]);
});

test("isWindowFocus=true, active=true, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#ffffff] dark:text-[#cdcdcd]",
    "bg-[#1b73e8] dark:bg-[#10629d]",
  ]);
});

test("isWindowFocus=true, active=true, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#fad2cf] dark:bg-[#482422]",
  ]);
});

test("isWindowFocus=true, active=true, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual([
    "text-[#ef432f] dark:text-[#ed4f4c]",
    "bg-[#fad2cf] dark:bg-[#482422]",
  ]);
});
