import Link from "next/link";
import { useActiveListings } from "../hooks/useActiveListings";
import NFTBox from "./NFTBox";

export default function RecentlyListedNFTs() {
  const { data: activeListings, isLoading, error } = useActiveListings();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8 text-center">
        <Link
          href="/list-nft"
          className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          List Your NFT
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6 mt-8">Recently Listed NFTs</h2>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading NFTs...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600">Error loading NFTs: {(error as Error).message}</p>
        </div>
      )}

      {!isLoading && !error && activeListings && activeListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No NFTs currently listed</p>
        </div>
      )}

      {!isLoading && !error && activeListings && activeListings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {activeListings.map((listing) => (
            <NFTBox
              key={`${listing.nftAddress}-${listing.tokenId}`}
              tokenId={listing.tokenId}
              contractAddress={listing.nftAddress}
              price={listing.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}