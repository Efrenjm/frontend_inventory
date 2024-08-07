import { render, screen, fireEvent } from '@testing-library/react';
import CustomRow from "./CustomRow";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe("CustomRow", () => {
  const mockRow = {
    id: 200,
    name: "Product 1"
  };

  const mockModalHandler = jest.fn();


  test("renders row with correct data", () => {
    const { getByText } = render(<CustomRow row={mockRow} modalHandler={mockModalHandler} />);

    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('Product 1')).toBeInTheDocument();
  });

  // test("calls modalHandler when delete button is clicked", () => {
  //   render(<CustomRow row={mockRow} modalHandler={mockModalHandler} />);
  //   const deleteButton = screen.getByRole("button", {name: "delete"});

  //   fireEvent.click(deleteButton);

  //   expect(mockModalHandler).toHaveBeenCalledWith(mockRow);
  // });
});