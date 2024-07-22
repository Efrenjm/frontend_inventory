import ItemCard from "../../app/items/[itemSlug]/ItemCard";
import { render, screen } from '@testing-library/react';


describe('ItemCard tests', () => {
  test('renders ItemCard component', () => {
    render(<ItemCard/>);
    const textFields = screen.getAllByRole('textbox');

    expect(textFields.length).toBe(7);
  })
});
