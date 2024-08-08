import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { getItemById, updateItem, createItem } from '@/utils/queries';
import ItemDetails from './ItemDetails';
import { MouseEvent } from "react";
import { iconMapper } from "@/components/animations/AnimatedIcon";
import { SxProps } from "@mui/material";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));
jest.mock('@/components/animations/AnimatedButton', () => {
  return function AnimatedButton({ text, onClick, icon, isLoading, iconSize, fontSize, sx, typeProps }:{text: string, icon: string, onClick: (event: MouseEvent) => void, isLoading: boolean, iconSize: number, fontSize: string, sx: SxProps, typeProps: SxProps}) {
    return (
      <button onClick={onClick} aria-label={icon}>{text}</button>
    )
  }
});
jest.mock('@/components/animations/AnimatedIcon', () => {
  return function AnimatedIcon({ text, icon, onClick }:{text: string, icon: string, onClick: (event: MouseEvent) => void}) {
    return <button onClick={onClick} aria-label={icon}>{text}</button>
  }
});

const mocks = [
  {
    request: {
      query: getItemById,
      variables: {id: '1'},
    },
    result: {
      data: {
        item: {
          id: '1',
          name: 'Test Item',
          location: {
            id: '1',
            state: 'NY',
            phoneNumber: '1234567890',
          },
        },
      },
    },
  },
  {
    request: {
      query: updateItem,
      variables: {item: {id: '1', name: 'Updated Item'}},
    },
    result: {
      data: {
        updateItem: {
          id: '1',
          name: 'Updated Item',
          location: {
            id: '1',
            state: 'NY',
            phoneNumber: '1234567890',
          },
        },
      },
    },
  },
  {
    request: {
      query: createItem,
      variables: {item: {name: 'New Item'}},
    },
    result: {
      data: {
        createItem: {
          id: '2',
          name: 'New Item',
          description: 'Item description',
          location: {
            id: '2',
            state: 'CA',
            phoneNumber: '0987654321',
            address: '123 Test St',
          },
        },
      },
    },
  },
];

describe('ItemDetails', () => {
  const initialValues = {
    id: '1',
    name: 'Test Item',
    description: 'Item description',
    location: {
      id: '1',
      state: 'NY',
      phoneNumber: '1234567890',
      address: '123 Test St',
    }
  };

  it('renders correctly with initial values',  async() => {
    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <ItemDetails
            isEditable={true}
            isSaving={false}
            isNew={false}
            initialValues={initialValues}
          />
        </MockedProvider>
      );
    });

    expect(screen.getByDisplayValue('Test Item')).toBeInTheDocument();
    expect(screen.getByDisplayValue('NY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('All form fields are editable when isEditable is true and the item is new', () => {
    const {queryAllByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ItemDetails
          isEditable={true}
          isNew={true}
          isSaving={false}
        />
      </MockedProvider>
    );

    const textFields = queryAllByRole('textbox');
    const numberFields = queryAllByRole('spinbutton');
    textFields.forEach(field => {
      expect(field).toHaveProperty('readOnly', false);
    })
    numberFields.forEach(field => {
      expect(field).toHaveProperty('readOnly', false);
    })
  });

  it('Only name and description are editable when isEditable is true and the item is not new', () => {
    const {queryAllByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ItemDetails
          isEditable={true}
          isNew={false}
          isSaving={false}
          initialValues={initialValues}
        />
      </MockedProvider>
    );
    const textFields = queryAllByRole('textbox');
    const numberFields = queryAllByRole('spinbutton');
    textFields.forEach((field) => {
      if (field.getAttribute('name') === 'name' || field.getAttribute('name') === 'description') {
        expect(field).toHaveProperty('readOnly', false);
      } else {
        expect(field).toHaveProperty('readOnly', true);
      }
    })
    numberFields.forEach(field => {
      expect(field).toHaveProperty('readOnly', true);
    })
  });

  it('FormFields are readOnly when an Item is displayed and is not editable', () => {
    const {queryAllByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ItemDetails
          isEditable={false}
          isSaving={false}
          isNew={false}
          initialValues={initialValues}
        />
      </MockedProvider>
    );

    const textFields = queryAllByRole('textbox');
    const numberFields = queryAllByRole('spinbutton');
    textFields.forEach(field => {
      expect(field).toHaveProperty('readOnly', true);
    })
    numberFields.forEach(field => {
      expect(field).toHaveProperty('readOnly', true);
    })
  });

  it('calls handleMutation on save',  async() => {
    const handleMutation = jest.fn();
    const handleMutationCompleted = jest.fn();
    const handleMutationFailed = jest.fn();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ItemDetails
          isEditable={true}
          isSaving={false}
          isNew={true}
          handleMutation={handleMutation}
          handleMutationCompleted={handleMutationCompleted}
          handleMutationFailed={handleMutationFailed}
        />
      </MockedProvider>
    );

    const saveButton =  await waitFor(() => screen.getByRole('button', {name: 'Save item'}));

    act(() => {
      fireEvent.change(screen.getByRole('spinbutton', { name: 'Id' }), { target: { value: initialValues.id } });
      fireEvent.change(screen.getByRole('textbox', { name: 'Item' }), { target: { value: initialValues.name } });
      fireEvent.change(screen.getByRole('textbox', { name: 'Description' }), { target: { value: initialValues.description } });
      fireEvent.change(screen.getByRole('spinbutton', { name: 'Location id' }), { target: { value: initialValues.location.id } });
      fireEvent.change(screen.getByRole('textbox', { name: 'State' }), { target: { value: initialValues.location.state } });
      fireEvent.change(screen.getByRole('textbox', { name: 'Phone Number' }), { target: { value: initialValues.location.phoneNumber } });
      fireEvent.change(screen.getByRole('textbox', { name: 'Address' }), { target: { value: initialValues.location.address } });

      fireEvent.click(saveButton);

      expect(handleMutation).toHaveBeenCalledWith({
        variables: { item: initialValues },
        onCompleted: expect.any(Function),
        onError: expect.any(Function)
      });
    });
  });

  it('Goes to /items when click on the header back button', () => {
    const {getByRole} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ItemDetails
          isEditable={true}
          isSaving={false}
          isNew={false}
          initialValues={initialValues}
        />
      </MockedProvider>
    );
    const backButton = getByRole('button', {name: 'Back'});

    fireEvent.click(backButton);
    expect(screen.getByDisplayValue('Updated Item')).toBeInTheDocument();
  });

  // it('validates form values correctly', () => {
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <ItemDetails
  //         isEditable={true}
  //         isSaving={false}
  //         isNew={false}
  //         initialValues={initialValues}
  //       />
  //     </MockedProvider>
  //   );
  //
  //   fireEvent.change(screen.getByLabelText('ID'), {target: {value: ''}});
  //   fireEvent.click(screen.getByText('Save'));
  //
  //   expect(screen.getByText('Please enter a valid ID')).toBeInTheDocument();
  // });
  //
  // it('calls handleMutation on save', () => {
  //   const handleMutation = jest.fn();
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <ItemDetails
  //         isEditable={true}
  //         isSaving={false}
  //         isNew={false}
  //         initialValues={initialValues}
  //         handleMutation={handleMutation}
  //       />
  //     </MockedProvider>
  //   );
  //
  //   fireEvent.click(screen.getByText('Save'));
  //   expect(handleMutation).toHaveBeenCalled();
  // });
  //
  // it('resets form on create next item', () => {
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <ItemDetails
  //         isEditable={true}
  //         isSaving={false}
  //         isNew={false}
  //         initialValues={initialValues}
  //       />
  //     </MockedProvider>
  //   );
  //
  //   fireEvent.click(screen.getByText('Create Next'));
  //   expect(screen.getByDisplayValue('')).toBeInTheDocument();
  // });
});
