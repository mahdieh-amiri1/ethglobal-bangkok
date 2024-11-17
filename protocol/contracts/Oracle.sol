// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/AbstractPyth.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable{
    IPyth public immutable pyth;
    int256 public Decimals = 8;

    // Events
    event AssetMapped(address indexed asset, bytes32 priceId);
    event AssetUnmapped(address indexed asset);

    // State variables
    mapping(address => bytes32) private assetToPriceId; // Mapping assets to price IDs
    bytes32 public immutable ethPriceId; // ETH price feed ID

    /**
     * @dev Constructor to initialize the Pyth contract and ETH price feed ID.
     * @param pythContractAddress Address of the Pyth contract.
     * @param ethPriceFeedId Price feed ID for ETH.
     */
    constructor(address pythContractAddress, bytes32 ethPriceFeedId) {
        require(pythContractAddress != address(0), "Invalid Pyth contract address");
        pyth = IPyth(pythContractAddress);
        ethPriceId = ethPriceFeedId;
    }

    /**
     * @notice Maps an asset to a price ID.
     * @param asset Asset address to map.
     * @param priceId Price feed ID for the asset.
     */
    function mapAssetToPriceId(address asset, bytes32 priceId) external onlyOwner {
        require(asset != address(0), "Invalid asset address");
        require(priceId != bytes32(0), "Invalid price ID");
        require(assetToPriceId[asset] == bytes32(0), "Asset already mapped");

        assetToPriceId[asset] = priceId;
        emit AssetMapped(asset, priceId);
    }

    /**
     * @notice Unmaps an asset from its price ID.
     * @param asset Asset address to unmap.
     */
    function unmapAsset(address asset) external onlyOwner {
        require(assetToPriceId[asset] != bytes32(0), "Asset not mapped");

        delete assetToPriceId[asset];
        emit AssetUnmapped(asset);
    }

    /**
     * @notice Retrieves the latest price for a specific asset.
     * @param asset Asset address to fetch price for.
     * @return Latest price of the asset in ETH.
     */
    function getAssetPrice(address asset) external view returns (int64) {
        bytes32 priceId = assetToPriceId[asset];
        require(priceId != bytes32(0), "Asset not mapped");

        // Fetch the latest ETH price
        PythStructs.Price memory ethPriceData = pyth.getPriceUnsafe(ethPriceId);
        require(ethPriceData.price > 0, "Invalid ETH price");

        int256 normalizedEthPrice = int256(ethPriceData.price) * int256(10**uint256(uint32(-ethPriceData.expo)));

        // Fetch the asset price
        PythStructs.Price memory priceData = pyth.getPriceUnsafe(priceId);
        require(priceData.price > 0, "Invalid asset price");

        // Normalize asset price to the fixed exponent
        int256 normalizedAssetPrice = int256(priceData.price) * int256(10**uint256(uint32(-priceData.expo)));

        // Calculate price in ETH terms
        int64 priceInETH = int64((normalizedAssetPrice * int256(10**uint256(Decimals))) / normalizedEthPrice);

        return priceInETH;
    }

    /**
     * @notice Gets the mapped price ID for a specific asset.
     * @param asset Asset address to check.
     * @return Price feed ID for the asset.
     */
    function getPriceIdForAsset(address asset) external view returns (bytes32) {
        return assetToPriceId[asset];
    }
}