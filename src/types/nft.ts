export interface ItemListed {
  rindexerId: number;
  contractAddress: string;
  seller: string | null;
  nftAddress: string | null;
  tokenId: string | null;
  price: string | null;
  txHash: string;
  blockNumber: string;
  blockTimestamp: string | null;
  network: string;
}

export interface ItemBought {
  contractAddress: string;
  nftAddress: string | null;
  tokenId: string | null;
  network: string;
}

export interface ItemCanceled {
  contractAddress: string;
  nftAddress: string | null;
  tokenId: string | null;
  network: string;
}

export interface ActiveListing {
  tokenId: string;
  contractAddress: string;
  price: string;
  seller: string;
  network: string;
  blockTimestamp: string;
}