import { useQuery } from "@tanstack/react-query";
import { fetchAllPages } from "../lib/graphqlClient";
import {
  GET_ALL_LISTED_ITEMS,
  GET_ALL_BOUGHT_ITEMS,
  GET_ALL_CANCELED_ITEMS,
} from "../graphql/queries";
import type { ItemListed, ItemBought, ItemCanceled, ActiveListing } from "../types/nft";

// Helper function to create a unique key for an NFT
function createNFTKey(item: {
  // contractAddress: string;
  nftAddress: string;
  tokenId: string | null;
}): string {
  return `${item.nftAddress}-${item.tokenId}`.toLowerCase();
}

// Filter out bought and canceled items from listed items
function getActiveListings(
  listed: ItemListed[],
  bought: ItemBought[],
  canceled: ItemCanceled[]
): ActiveListing[] {
  // Create a Set of bought and canceled NFT keys for quick lookup
  const removedNFTs = new Set<string>();

  bought.forEach((item) => {
    if (item.tokenId && item.nftAddress) {
      removedNFTs.add(createNFTKey(item as any));
    }
  });

  canceled.forEach((item) => {
    if (item.tokenId && item.nftAddress) {
      removedNFTs.add(createNFTKey(item as any));
    }
  });

  // Filter listed items to only include active listings
  return listed
    .filter((item) => {
      if (!item.tokenId || !item.nftAddress || !item.price) {
        return false;
      }
      const key = createNFTKey(item);
      return !removedNFTs.has(key);
    })
    .map((item) => ({
      tokenId: item.tokenId!,
      nftAddress: item.nftAddress,
      price: item.price!,
      seller: item.seller || "",
    }));
}

export function useActiveListings() {
  return useQuery({
    queryKey: ["activeListings"],
    queryFn: async () => {
      // Fetch all data in parallel
      const [listedItems, boughtItems, canceledItems] = await Promise.all([
        fetchAllPages<ItemListed>(GET_ALL_LISTED_ITEMS, "allItemListeds"),
        fetchAllPages<ItemBought>(GET_ALL_BOUGHT_ITEMS, "allItemBoughts"),
        fetchAllPages<ItemCanceled>(GET_ALL_CANCELED_ITEMS, "allItemCanceleds"),
      ]);

      // Filter to get only active listings
      const activeListings = getActiveListings(
        listedItems,
        boughtItems,
        canceledItems
      );

      return activeListings;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}