import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Admin template smoke test", () => {
  it("renders intro text", () => {
    render(<Home />);
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
  });
});
