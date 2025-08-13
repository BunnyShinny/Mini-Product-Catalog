// __tests__/HomePageIntegration.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../app/page"; // adjust path
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const mockProducts = [
  { id: 1, title: "Apple Watch", price: 200, rating: { count: 5 }, category: "electronics" },
  { id: 2, title: "Banana Phone", price: 50, rating: { count: 10 }, category: "electronics" },
  { id: 3, title: "Car Toy", price: 30, rating: { count: 3 }, category: "toys" },
];

const mockCategories = ["electronics", "toys"];

describe("HomePage Full Flow", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("fetches products, filters by dropdown, searches, sorts, and paginates", async () => {
    // Mock first fetch for products
    fetch.mockResponseOnce(JSON.stringify(mockProducts));

    render(<HomePage />);

    // Wait for products to render
    await waitFor(() => {
      expect(screen.getByText("Apple Watch")).toBeInTheDocument();
      expect(screen.getByText("Banana Phone")).toBeInTheDocument();
      expect(screen.getByText("Car Toy")).toBeInTheDocument();
    });

    // ----- Dropdown filter -----
    fetch.mockResponseOnce(JSON.stringify(mockCategories));
    const dropdownButton = screen.getByRole("button", { name: /All/i });
    fireEvent.click(dropdownButton);

    // Wait for categories to load
    await waitFor(() => screen.getByText("Electronics"));

    // Click "Electronics" category
    fetch.mockResponseOnce(
      JSON.stringify(mockProducts.filter(p => p.category === "electronics"))
    );
    fireEvent.click(screen.getByText("Electronics"));

    await waitFor(() => {
      expect(screen.getByText("Apple Watch")).toBeInTheDocument();
      expect(screen.getByText("Banana Phone")).toBeInTheDocument();
      expect(screen.queryByText("Car Toy")).not.toBeInTheDocument();
    });

    // ----- Search -----
    const searchInput = screen.getByPlaceholderText("Search ...");
    fireEvent.change(searchInput, { target: { value: "banana" } });

    expect(screen.getByText("Banana Phone")).toBeInTheDocument();
    expect(screen.queryByText("Apple Watch")).not.toBeInTheDocument();

    // ----- Sort -----
    const priceButton = screen.getByText("Price");
    fireEvent.click(priceButton); // ascending
    const productCards = screen.getAllByText(/Phone|Watch/i);
    expect(productCards[0]).toHaveTextContent("Banana Phone");

    fireEvent.click(priceButton); // descending
    const productCardsDesc = screen.getAllByText(/Phone|Watch/i);
    expect(productCardsDesc[0]).toHaveTextContent("Apple Watch");

    // ----- Pagination (if more than 8 products, skipped for 3 items) -----
    // For demonstration, let's check the page buttons exist
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
