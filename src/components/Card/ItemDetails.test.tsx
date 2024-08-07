import { render, screen, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { getItemById, updateItem, createItem } from '@/utils/queries';
import ItemDetails from './ItemDetails';

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

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
          location: {
            id: '2',
            state: 'CA',
            phoneNumber: '0987654321',
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
    location: {
      id: '1',
      state: 'NY',
      phoneNumber: '1234567890'
    }
  };

  it('renders correctly with initial values', () => {

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

  it('calls handleMutation on save', async () => {
    const handleMutation = jest.fn().mockResolvedValue({
      data: {updateItem: {id: '1', name: 'Updated Item'}}
    });
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
    /*TODO: Button not found*/
    act(() => {
      fireEvent.click(screen.getByText('Save item'));
    })

    expect(handleMutation).toHaveBeenCalledWith({
      variables: { item: initialValues },
      onError: expect.any(Function),
      onCompleted: expect.any(Function)
    });

    await act(async () => {
      await handleMutation.mock.calls[0][0].onCompleted({ updateItem: { id: '1', name: 'Updated Item' } });
    });

    expect(handleMutationCompleted).toHaveBeenCalled();
  });

  // it('updates form values on change', () => {
  //   const {getAllByRole} = render(
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
  //   fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Updated Item'}});
  //   expect(screen.getByDisplayValue('Updated Item')).toBeInTheDocument();
  // });

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
