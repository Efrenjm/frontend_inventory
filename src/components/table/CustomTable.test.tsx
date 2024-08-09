import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { getAllItems } from '@/utils/queries';
import { Dispatch, MouseEvent, SetStateAction } from "react";
import CustomTable from "@/components/table/CustomTable";
import { useRouter } from "next/navigation";
import ItemDetails from "@/components/card/ItemDetails";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
// jest.mock('@/components/animations/AnimatedButton', () => {
//   return function AnimatedButton({ text, onClick, icon, isLoading, iconSize, fontSize, sx, typeProps }:{text: string, icon: string, onClick: (event: MouseEvent) => void, isLoading: boolean, iconSize: number, fontSize: string, sx: SxProps, typeProps: SxProps}) {
//     return (
//       <button onClick={onClick} aria-label={text}>{text}</button>
//     )
//   }
// });
jest.mock('@/components/animations/AnimatedIcon', () => {
  return function AnimatedIcon({ text, icon, onClick }:{text: string, icon: string, onClick: (event: MouseEvent) => void}) {
    return <button onClick={onClick} aria-label={icon}>_</button>
  }
});

jest.mock('@/components/animations/NotFound', () => {
  return function AnimatedIcon({ title, message, }:{title: string, message: string, onClick: (event: MouseEvent) => void}) {
    return <div>{title}</div>
  }
});
jest.mock('@/components/animations/LoopedAnimation', () => {
  return function AnimatedIcon({ size, icon, sx }:{size: number, icon: string, sx: any}) {
    return <div>{icon}</div>
  }
});

jest.mock('@/components/modal/DeleteModal',()=>{
  return function ModalTemplate(props:any) {
    return (
      <div data-testid='modal'>modal</div>
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
        items: [
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
];

describe('CustomTable', () => {
  const rows = [
    {
      id: 1,
      name: 'Item 1'
    },
    {
      id: 2,
      name: 'Item 2'
    }
  ];

  it('renders correctly with initial values',  async() => {
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
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('redirects to items/{id} when a row is clicked', async() => {
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
    const backButton = getAllByRole('button', {name: 'edit'})[0];
    fireEvent.click(backButton);

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
});

