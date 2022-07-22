import { getClassName } from "../get-class-name";

test("isWindowFocus=false, active=false, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#292929]"]);
});

test("isWindowFocus=false, active=false, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#242424]"]);
});

test("isWindowFocus=false, active=false, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#292929]"]);
});

test("isWindowFocus=false, active=false, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: false,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#242424]"]);
});

test("isWindowFocus=false, active=true, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#454545]"]);
});

test("isWindowFocus=false, active=true, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#454545]"]);
});

test("isWindowFocus=false, active=true, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#454545]"]);
});

test("isWindowFocus=false, active=true, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: false,
    isActive: true,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#454545]"]);
});

/// ----

test("isWindowFocus=true, active=false, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#292929]"]);
});

test("isWindowFocus=true, active=false, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#bec6cf]", "bg-[#242424]"]);
});

test("isWindowFocus=true, active=false, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#292929]"]);
});

test("isWindowFocus=true, active=false, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: false,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#242424]"]);
});

test("isWindowFocus=true, active=true, error=false, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: false,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#cdcdcd]", "bg-[#10629d]"]);
});

test("isWindowFocus=true, active=true, error=false, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: false,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#cdcdcd]", "bg-[#10629d]"]);
});

test("isWindowFocus=true, active=true, error=true, odd=false", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: true,
    isOdd: false,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#482422]"]);
});

test("isWindowFocus=true, active=true, error=true, odd=true", () => {
  const result = getClassName({
    isWindowFocus: true,
    isActive: true,
    isError: true,
    isOdd: true,
  });

  expect(result).toEqual(["text-[#ed4f4c]", "bg-[#482422]"]);
});
