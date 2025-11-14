import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

describe("Customer template smoke test", () => {
  it("renders intro text", () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });
});
