import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "./BackToTop";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";

describe("BackToTop component", () => {
  beforeEach(() => {
    // mock scrollTo
    window.scrollTo = vi.fn();

    // reset scroll position
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("is hidden initially", () => {
    render(<BackToTop />);

    const button = screen.getByLabelText("Back to top");
    expect(button).toHaveStyle("display: none");
  });

  it("appears when scrolling past 400px", () => {
    render(<BackToTop />);

    window.pageYOffset = 500;
    fireEvent.scroll(window);

    const button = screen.getByLabelText("Back to top");
    expect(button).toHaveStyle("display: flex");
  });

  it("hides again when scrolling back up", () => {
    render(<BackToTop />);

    window.pageYOffset = 500;
    fireEvent.scroll(window);

    window.pageYOffset = 200;
    fireEvent.scroll(window);

    const button = screen.getByLabelText("Back to top");
    expect(button).toHaveStyle("display: none");
  });

  it("scrolls to top when clicked", () => {
    render(<BackToTop />);

    window.pageYOffset = 500;
    fireEvent.scroll(window);

    const button = screen.getByLabelText("Back to top");
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
