import { render, screen, fireEvent, act, waitFor, getByLabelText } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { deleteItem, getAllItems } from "@/utils/queries";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import CustomTable from "@/components/table/CustomTable";
import { useRouter } from "next/navigation";
import { CustomModalProps } from "@/components/modal/ModalTemplate";
import { TableFields } from "./tableTypes";
import { createTheme, ThemeProvider } from "@mui/material";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/components/animations/AnimatedIcon", () => {
  return function AnimatedIcon({
    text,
    icon,
    onClick,
  }: {
    text: string;
    icon: string;
    onClick: (event: MouseEvent) => void;
  }) {
    return (
      <button onClick={onClick} aria-label={icon} type="button">
        _
      </button>
    );
  };
});

jest.mock("@/components/animations/NotFound", () => {
  return function AnimatedIcon({
    title,
    message,
  }: {
    title: string;
    message: string;
    onClick: (event: MouseEvent) => void;
  }) {
    return <div>{title}</div>;
  };
});
jest.mock("@/components/animations/LoopedAnimation", () => {
  return function AnimatedIcon({ size, icon, sx }: { size: number; icon: string; sx: any }) {
    return <div>{icon}</div>;
  };
});
//
// jest.mock('@/components/modal/DeleteModal',()=>{
//   return function ModalTemplate({open, title, description, callToAction, handleAction, callToCancel, handleCancel, loading, disabled}: CustomModalProps) {
//     return (
//       <dialog data-testid='modal' open={open}>
//         <h5>{title}</h5>
//         <p>{description}</p>
//         <menu>
//           <button onClick={handleAction}>{callToAction}</button>
//           <button onClick={handleCancel}>{callToCancel}</button>
//         </menu>
//       </dialog>
//     )
//   }
// })
jest.mock("@/components/modal/ModalTemplate", () => {
  return function ModalTemplate({
    open,
    title,
    description,
    callToAction,
    handleAction,
    callToCancel,
    handleCancel,
    loading,
    disabled,
  }: CustomModalProps) {
    return (
      <dialog data-testid="modal" open={open}>
        <h5>{title}</h5>
        <p>{description}</p>
        <menu>
          <button onClick={handleAction}>{callToAction}</button>
          <button onClick={handleCancel}>{callToCancel}</button>
        </menu>
      </dialog>
    );
  };
});

const mocks = [
  {
    request: {
      query: getAllItems,
      variables: {},
    },
    result: {
      data: {
        getAllItems: [
          {
            id: "1",
            name: "Item 1",
          },
          {
            id: "2",
            name: "Item 2",
          },
        ],
      },
    },
  },
  {
    request: {
      query: deleteItem,
      variables: { id: "1" },
    },
    result: {
      data: {
        deleteItem: {
          id: "1",
        },
      },
    },
  },
];
const theme = createTheme();
describe("CustomTable", () => {
  const rows: TableFields[] = [
    {
      id: 1,
      name: "Item 1",
      description: "First Item",
      state: "First State",
    },
    {
      id: 2,
      name: "Item 2 to filter",
      description: "Second Item",
      state: "Second State",
    },
    {
      id: 3,
      name: "Item 3 ",
      description: "Third Item",
      state: "Second State",
    },
  ];
  const renderWithTheme = (component: React.ReactElement) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </MockedProvider>
    );
  it("renders correctly with initial values", async () => {
    await act(async () => {
      renderWithTheme(<CustomTable rows={rows} />);
    });
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Item 2 to filter")).toBeInTheDocument();
  });

  it("filters items by ID (Success)", async () => {
    const { getByLabelText, queryByText } = renderWithTheme(<CustomTable rows={rows} />);
    const filterInput = getByLabelText("Filter by ID");
    fireEvent.change(filterInput, { target: { value: 2 } });
    await act(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
    });
  });
  it("filters items by ID (Fail)", async () => {
    const { queryByText, getByLabelText } = renderWithTheme(<CustomTable rows={rows} />);
    const filterInput = getByLabelText("Filter by ID");
    fireEvent.change(filterInput, { target: { value: 99999 } });
    await waitFor(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).not.toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).not.toBeInTheDocument();
      expect(queryByText("3")).not.toBeInTheDocument();
      expect(queryByText("Item 3 to filter")).not.toBeInTheDocument();
      expect(queryByText("No items found")).toBeInTheDocument();
    });
  });

  it("filters items by Name (Success)", async () => {
    const { getByRole, queryByText } = renderWithTheme(<CustomTable rows={rows} />);
    const filterInput = getByRole("combobox", { name: "Filter by name" });

    fireEvent.change(filterInput, { target: { value: "filter" } });
    await act(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter", { selector: "p" })).toBeInTheDocument();
    });
  });
  it("filters items by Name (Fail)", async () => {
    const { getByRole, queryByText } = renderWithTheme(<CustomTable rows={rows} />);
    const filterInput = getByRole("combobox", { name: "Filter by name" });

    fireEvent.change(filterInput, { target: { value: "AAAAAAAAAA" } });
    await waitFor(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).not.toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).not.toBeInTheDocument();
      expect(queryByText("3")).not.toBeInTheDocument();
      expect(queryByText("Item 3 to filter")).not.toBeInTheDocument();
      expect(queryByText("No items found")).toBeInTheDocument();
    });
  });

  it("filters items by State", async () => {
    const { queryByText, getByRole } = await act(async () => {
      return renderWithTheme(<CustomTable rows={rows} />);
    });
    const filterInput = getByRole("combobox", { name: "Filter by state" });
    fireEvent.focus(filterInput);
    fireEvent.mouseDown(filterInput);
    //Select only Second State
    const option2 = await waitFor(() => getByRole("option", { name: "Second State" }));
    fireEvent.click(option2);
    await waitFor(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
    //Select also First State
    const option1 = await waitFor(() => getByRole("option", { name: "First State" }));
    fireEvent.click(option1);

    await waitFor(async () => {
      expect(queryByText("1")).toBeInTheDocument();
      expect(queryByText("Item 1")).toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
  });

  it("filters items by State- Remove a State from the selected - Click Checkbox", async () => {
    const { queryByText, getByRole, getAllByRole } = await act(async () => {
      return renderWithTheme(<CustomTable rows={rows} />);
    });
    const filterInput = getByRole("combobox", { name: "Filter by state" });
    fireEvent.focus(filterInput);
    fireEvent.mouseDown(filterInput);

    const options = await waitFor(() => getAllByRole("option"));
    //Select both States
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    await waitFor(async () => {
      expect(queryByText("1")).toBeInTheDocument();
      expect(queryByText("Item 1")).toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
    //Deselect First State by clicking the option in the list
    const option1 = getByRole("option", { name: "First State" });
    fireEvent.click(option1);

    await waitFor(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
  });
  it("filters items by State- Remove a State from the selected - Click Chip", async () => {
    const { queryByText, getByRole, getAllByRole } = await act(async () => {
      return renderWithTheme(<CustomTable rows={rows} />);
    });
    const filterInput = getByRole("combobox", { name: "Filter by state" });
    fireEvent.focus(filterInput);
    fireEvent.mouseDown(filterInput);

    const options = await waitFor(() => getAllByRole("option"));
    //Select both States
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);
    await waitFor(async () => {
      expect(queryByText("1")).toBeInTheDocument();
      expect(queryByText("Item 1")).toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
    //Deselect First State by clicking the delete icon on the chip list
    const chipState1 = getByRole("button", { name: "First State" });
    const deleteIcon = chipState1.querySelector("svg")!;
    fireEvent.click(deleteIcon);
    await waitFor(async () => {
      expect(queryByText("1")).not.toBeInTheDocument();
      expect(queryByText("Item 1")).not.toBeInTheDocument();
      expect(queryByText("2")).toBeInTheDocument();
      expect(queryByText("Item 2 to filter")).toBeInTheDocument();
      expect(queryByText("3")).toBeInTheDocument();
      expect(queryByText("Item 3")).toBeInTheDocument();
    });
  });

  it("redirects to items/{id} when a row is clicked", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    await act(async () => {
      renderWithTheme(<CustomTable rows={rows} />);
    });

    fireEvent.click(screen.getByTestId("custom-row-1"));
    expect(push).toHaveBeenCalledWith("/items/1");
  });

  it("redirects to /items/{id}?edit=true when a edit button is clicked", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getAllByRole } = await act(async () => {
      return renderWithTheme(<CustomTable rows={rows} />);
    });
    const editButton = await waitFor(() => getAllByRole("button", { name: "edit" })[0]);
    fireEvent.click(editButton);

    expect(push).toHaveBeenCalledWith("/items/1?edit=true");
  });

  it("open a modal when a delete button is clicked", async () => {
    await act(async () => {
      renderWithTheme(<CustomTable rows={rows} />);
    });
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    const deleteButton = screen.getAllByRole("button", { name: "delete" })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });

  it("redirects to /newItem when the add button is clicked", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getByRole } = renderWithTheme(<CustomTable rows={rows} />);
    const addButton = getByRole("button", { name: "add" });
    fireEvent.click(addButton);

    expect(push).toHaveBeenCalledWith("/newItem");
  });
});
