import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { deleteItem, getAllItems } from '@/utils/queries';
import { Dispatch, MouseEvent, SetStateAction } from "react";
import CustomTable from "@/components/table/CustomTable";
import { useRouter } from "next/navigation";
import { CustomModalProps } from "@/components/modal/ModalTemplate";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/components/animations/AnimatedIcon', () => {
  return function AnimatedIcon({text, icon, onClick}: {
    text: string,
    icon: string,
    onClick: (event: MouseEvent) => void
  }) {
    return <button onClick={onClick} aria-label={icon}>_</button>
  }
});

jest.mock('@/components/animations/NotFound', () => {
  return function AnimatedIcon({title, message,}: {
    title: string,
    message: string,
    onClick: (event: MouseEvent) => void
  }) {
    return <div>{title}</div>
  }
});
jest.mock('@/components/animations/LoopedAnimation', () => {
  return function AnimatedIcon({size, icon, sx}: { size: number, icon: string, sx: any }) {
    return <div>{icon}</div>
  }
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
jest.mock('@/components/modal/ModalTemplate', () => {
  return function ModalTemplate({
                                  open,
                                  title,
                                  description,
                                  callToAction,
                                  handleAction,
                                  callToCancel,
                                  handleCancel,
                                  loading,
                                  disabled
                                }: CustomModalProps) {
    return (
      <dialog data-testid='modal' open={open}>
        <h5>{title}</h5>
        <p>{description}</p>
        <menu>
          <button onClick={handleAction}>{callToAction}</button>
          <button onClick={handleCancel}>{callToCancel}</button>
        </menu>
      </dialog>
    )
  }
})

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
              id: '1',
              name: 'Item 1'
            },
            {
              id: '2',
              name: 'Item 2'
            }
          ]

      },
    },
  },
  {
    request: {
      query: deleteItem,
      variables: {id: '1'},
    },
    result: {
      data: {
        deleteItem: {
          id: '1'
        }
      },
    },
  },
];

describe('CustomTable', () => {
  const rows = [
    {
      id: 1,
      name: 'Item 1'
    },
    {
      id: 2,
      name: 'Item 2 to filter'
    }
  ];

  it('renders correctly with initial values', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CustomTable rows={rows}/>
        </MockedProvider>
      )
    });
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Item 2 to filter')).toBeInTheDocument();
  });

  it('filters by item name', async () => {
    const {getByRole, queryByText} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomTable rows={rows}/>
      </MockedProvider>
    );
    const searchInput = getByRole('searchbox', {name: 'Search items'});
    fireEvent.change(searchInput, {target: {value: 'filter'}});

    expect(queryByText('1')).not.toBeInTheDocument();
    expect(queryByText('Item 1')).not.toBeInTheDocument();
    expect(queryByText('2')).toBeInTheDocument();
    expect(queryByText('Item 2 to filter')).toBeInTheDocument();
  });

  it('redirects to items/{id} when a row is clicked', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({push});

    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CustomTable rows={rows}/>
        </MockedProvider>
      )
    });

    fireEvent.click(screen.getByTestId('custom-row-1'));
    expect(push).toHaveBeenCalledWith('/items/1');
  });


  it('redirects to /items/{id}?edit=true when a edit button is clicked', () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({push});

    const {getAllByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomTable rows={rows}/>
      </MockedProvider>
    );
    const editButton = getAllByRole('button', {name: 'edit'})[0];
    fireEvent.click(editButton);

    expect(push).toHaveBeenCalledWith('/items/1?edit=true');
  });

  it('open a modal when a delete button is clicked', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CustomTable rows={rows}/>
        </MockedProvider>
      );
    });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    const deleteButton = screen.getAllByRole('button', {name: 'delete'})[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  it('redirects to /newItem when the add button is clicked', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({push});

    const {getByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CustomTable rows={rows}/>
      </MockedProvider>
    );
    const addButton = getByRole('button', {name: 'add'});
    fireEvent.click(addButton);

    expect(push).toHaveBeenCalledWith('/newItem');
  });
});
