import { fireEvent, render } from "@testing-library/react";
import FormFields from "./FormFields";


describe('FormFields Component', () => {
  const mockHandleFormChanges = jest.fn();
  const defaultProps = {
    formValues: {
      id: "1",
      name: 'Test Item',
      description: 'Test Description',
      location: {
        id: "1",
        state: 'Test State',
        phoneNumber: '1234567890',
        address: 'Test Address'
      }
    },
    invalidData: {
      id: { error: false, message: '' },
      name: { error: false, message: '' },
      locationId: { error: false, message: '' },
      locationState: { error: false, message: '' },
      locationPhoneNumber: { error: false, message: '' }
    },
    readOnly: false,
    isNew: true,
    handleFormChanges: mockHandleFormChanges
  };

  it('should render correctly with default props', () => {
    const { getByText } = render(<FormFields {...defaultProps} />);
    expect(getByText('Id')).toBeInTheDocument();
    expect(getByText('Item')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Location id')).toBeInTheDocument();
    expect(getByText('State')).toBeInTheDocument();
    expect(getByText('Phone Number')).toBeInTheDocument();
    expect(getByText('Address')).toBeInTheDocument();
  });

  it('should call handleFormChanges on input change', () => {
    const { getByRole } = render(<FormFields {...defaultProps} />);
    fireEvent.change(getByRole('spinbutton', { name: 'Id' }), { target: { value: '2' } });
    expect(mockHandleFormChanges).toHaveBeenCalled();
  });

  it('should display error messages when invalidData is provided', () => {
    const errorProps = {
      ...defaultProps,
      invalidData: {
        id: { error: true, message: 'Invalid ID' },
        name: { error: true, message: 'Invalid Name' },
        locationId: { error: true, message: 'Invalid Location ID' },
        locationState: { error: true, message: 'Invalid State' },
        locationPhoneNumber: { error: true, message: 'Invalid Phone Number' }
      }
    };
    const { getByText } = render(<FormFields {...errorProps} />);
    expect(getByText('Invalid ID')).toBeInTheDocument();
    expect(getByText('Invalid Name')).toBeInTheDocument();
    expect(getByText('Invalid Location ID')).toBeInTheDocument();
    expect(getByText('Invalid State')).toBeInTheDocument();
    expect(getByText('Invalid Phone Number')).toBeInTheDocument();
  });

  it('should render all fields with readOnly attribute when readOnly is true', () => {
    const readOnlyProps = { ...defaultProps, readOnly: true };
    const { getByRole } = render(<FormFields {...readOnlyProps} />);

    expect(getByRole('spinbutton', { name: 'Id' })).toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Item' })).toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Description' })).toHaveAttribute('readonly');
    expect(getByRole('spinbutton', { name: 'Location id' })).toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'State' })).toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Phone Number' })).toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Address' })).toHaveAttribute('readonly');
  });

  it('should render all fields without readOnly attribute when readOnly is false', () => {
    const editableProps = { ...defaultProps, readOnly: false };
    const { getByRole } = render(<FormFields {...editableProps} />);

    expect(getByRole('spinbutton', { name: 'Id' })).not.toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Item' })).not.toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Description' })).not.toHaveAttribute('readonly');
    expect(getByRole('spinbutton', { name: 'Location id' })).not.toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'State' })).not.toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Phone Number' })).not.toHaveAttribute('readonly');
    expect(getByRole('textbox', { name: 'Address' })).not.toHaveAttribute('readonly');
  });
});