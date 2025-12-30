import { render, screen } from "@testing-library/react";

test("renders hello", () => {
  render(<h1>Hello Vitest!</h1>);
  expect(screen.getByText("Hello Vitest!")).toBeInTheDocument();
});
