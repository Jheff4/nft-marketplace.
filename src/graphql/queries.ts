export const GET_ALL_LISTED_ITEMS = `
  query GetAllListedItems($first: Int) {
    allItemListeds(
      first: $first
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
      }
     
    }
  }
`;

export const GET_ALL_BOUGHT_ITEMS = `
  query GetAllBoughtItems {
    allItemBoughts {
      nodes {
        nftAddress
        tokenId
      }
    }
  }
`;

export const GET_ALL_CANCELED_ITEMS = `
  query GetAllCanceledItems {
    allItemCanceleds {
      nodes {
        nftAddress
        tokenId
      }
    }
  }
`;