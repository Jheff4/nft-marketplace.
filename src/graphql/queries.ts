export const GET_ALL_LISTED_ITEMS = `
  query GetAllListedItems($first: Int, $after: Cursor) {
    allItemListeds(
      first: 20
      after: $after
      orderBy: [BLOCK_NUMBER_DESC, TX_INDEX_DESC]
    ) {
      nodes {
        rindexerId
        contractAddress
        seller
        nftAddress
        tokenId
        price
        txHash
        blockNumber
        blockTimestamp
        network
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_ALL_BOUGHT_ITEMS = `
  query GetAllBoughtItems($first: Int, $after: Cursor) {
    allItemBoughts(
      first: $first
      after: $after
    ) {
      nodes {
        contractAddress
        nftAddress
        tokenId
        network
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ALL_CANCELED_ITEMS = `
  query GetAllCanceledItems($first: Int, $after: Cursor) {
    allItemCanceleds(
      first: $first
      after: $after
    ) {
      nodes {
        contractAddress
        nftAddress
        tokenId
        network
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;