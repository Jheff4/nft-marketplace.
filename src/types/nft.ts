export interface ItemListed {
  rindexerId: number;
  contractAddress: string;
  seller: string;
  nftAddress: string;
  tokenId: string;
  price: string;
  txHash: string;
  blockNumber: string;
}

export interface ItemBought {
  nftAddress: string;
  tokenId: string;
}

export interface ItemCanceled {
  nftAddress: string;
  tokenId: string;
}

export interface ActiveListing {
  tokenId: string;
  nftAddress: string;
  price: string;
  seller: string;
}