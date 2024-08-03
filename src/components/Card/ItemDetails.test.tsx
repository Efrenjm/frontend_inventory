import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ItemDetails from '@/components/card/ItemDetails';
import { FormValues } from '@/utils/types';

const mockHandleMutation = jest.fn();

const initialValues: FormValues = {
  id: '1',
  name: 'Test Item',
  description: 'Test Description',
  location: {
    id: '1',
    state: 'NY',
    phoneNumber: '1234567890',
    address: '123 Main St'
  }
};

describe('ItemDetails', () => {
  it('renders correctly with initial values', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={false}
        initialValues={initialValues}
      />
    );

    expect(screen.getByDisplayValue('Test Item')).toBeInTheDocument();
    expect(screen.getByDisplayValue('NY')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('handles form changes', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={false}
        initialValues={initialValues}
      />
    );

    const nameInput = screen.getByDisplayValue('Test Item');
    fireEvent.change(nameInput, { target: { value: 'Updated Item' } });

    expect(screen.getByDisplayValue('Updated Item')).toBeInTheDocument();
  });

  it('validates form fields', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={false}
        initialValues={initialValues}
      />
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(screen.getByText('Please enter a valid name')).toBeInTheDocument();
    // Agregar más expectativas según los campos validados
  });

  it('calls handleMutation on save', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={false}
        initialValues={initialValues}
        handleMutation={mockHandleMutation}
      />
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(mockHandleMutation).toHaveBeenCalled();
  });

  it('handles save item correctly', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={false}
        initialValues={initialValues}
        handleMutation={mockHandleMutation}
      />
    );

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Simular la respuesta de éxito de la mutación
    mockHandleMutation.mock.calls[0][0].onCompleted({
      createItem: {
        id: '2',
        name: 'New Item',
        location: {
          id: '2',
          state: 'CA',
          phoneNumber: '0987654321'
        }
      }
    });

    expect(screen.getByDisplayValue('New Item')).toBeInTheDocument();
    expect(screen.getByDisplayValue('CA')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0987654321')).toBeInTheDocument();
  });

  it('handles create next item', () => {
    render(
      <ItemDetails
        isEditable={true}
        isSaving={false}
        isNew={true}
        initialValues={initialValues}
      />
    );

    const createNextButton = screen.getByText('Create Next');
    fireEvent.click(createNextButton);

    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
});
