import { gql } from '@/__generated__/gql';

// export const allItemFields = gql(`
//     fragment AllItemFields on Item {
//         id
//         name
//         description
//         location {
//             id
//             address
//             phoneNumber
//             state
//         }
//     }
// `);

export const getAllItems = gql(`
    query GetAllItems {
        getAllItems {
            id
            name
        }
    }
`);

export const getItemById = gql(`
  query GetItemById($id: ID!) {
    getItemById(id: $id) {
      id
      name
      description
      location {
          id
          address
          phoneNumber
          state
      }
    }
  }
`);
  // ${allItemFields}

export const createItem = gql(`
  mutation CreateItem($item: ItemInput!) {
    createItem(item: $item) {
      id
      name
      description
      location {
          id
          address
          phoneNumber
          state
      }
    }
  }
`);
  // ${allItemFields}

export const updateItem = gql(`
  mutation UpdateItem($item: ItemInput!) {
    updateItem(item: $item) {
      id
      name
      description
      location {
          id
          address
          phoneNumber
          state
      }
    }
  }
`);
  // ${allItemFields}

export const deleteItem = gql(`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`);
