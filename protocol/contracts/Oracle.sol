// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/AbstractPyth.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Oracle is Ownable{
    IPyth public immutable pyth;
    int256 public Decimals = 8;

    // Events
    event PriceIdAdded(bytes32 indexed priceId);
    event PriceIdRemoved(bytes32 indexed priceId);

    // State variables
    bytes32[] private priceIds; // Dynamic array for tracked price IDs

    bytes32 public immutable ethPriceId; // ETH price feed ID

    /**
     * @dev Constructor to initialize the Pyth contract and ETH price feed ID.
     * @param pythContractAddress Address of the Pyth contract.
     * @param ethPriceFeedId Price feed ID for ETH.
     */
    constructor(address pythContractAddress, bytes32 ethPriceFeedId) Ownable(msg.sender) {
        require(pythContractAddress != address(0), "Invalid Pyth contract address");
        pyth = IPyth(pythContractAddress);
        ethPriceId = ethPriceFeedId;
    }

    /**
	 * @notice Retrieves the latest price for a specific asset.
     * @param priceId Price feed ID to fetch.
     * @return Latest price of the asset in ETH.
     */
    function getPrice(bytes32 priceId) external view returns (int64) {
        require(_isPriceIdTracked(priceId), "Price ID not tracked");

        // Fetch the latest ETH price
        PythStructs.Price memory ethPriceData = pyth.getPriceUnsafe(ethPriceId);
        require(ethPriceData.price > 0, "Invalid ETH price");

        int256 normalizedEthPrice = int256(ethPriceData.price) * int256(10**uint256(uint32(-ethPriceData.expo)));

        PythStructs.Price memory priceData = pyth.getPriceUnsafe(priceId);
        require(priceData.price > 0, "Invalid asset price");

        // Normalize asset price to the fixed exponent
        int256 normalizedAssetPrice = int256(priceData.price) * int256(10**uint256(uint32(-priceData.expo)));

        // Calculate price in ETH terms
        int64 priceInETH = int64((normalizedAssetPrice * int256(10**uint256(Decimals))) / normalizedEthPrice);

        return priceInETH;
    }

    /**
     * @notice Adds a new price ID to the tracked list.
     * @param priceId Price feed ID to add.
     */
    function addPriceId(bytes32 priceId) onlyOwner external {
        require(!_isPriceIdTracked(priceId), "Price ID already tracked");
        priceIds.push(priceId);
        emit PriceIdAdded(priceId);
    }

    /**
     * @notice Removes a price ID from the tracked list.
     * @param priceId Price feed ID to remove.
     */
    function removePriceId(bytes32 priceId) onlyOwner external {
        require(_isPriceIdTracked(priceId), "Price ID not tracked");

        uint256 length = priceIds.length;
        for (uint256 i = 0; i < length; i++) {
            if (priceIds[i] == priceId) {
                priceIds[i] = priceIds[length - 1]; // Replace with last element
                priceIds.pop(); // Remove last element
                emit PriceIdRemoved(priceId);
                return;
            }
        }
    }

    /**
     * @notice Retrieves all tracked price IDs.
     * @return Tracked price IDs.
     */
    function getTrackedPriceIds() external view returns (bytes32[] memory) {
        return priceIds;
    }

    /**
     * @notice Checks if a price ID is currently tracked.
     * @param priceId Price feed ID to check.
     * @return True if the price ID is tracked, false otherwise.
     */
    function isPriceIdTracked(bytes32 priceId) external view returns (bool) {
        return _isPriceIdTracked(priceId);
    }

    /**
     * @dev Internal helper function to check if a price ID is tracked.
     * @param priceId Price feed ID to check.
     * @return True if the price ID is tracked, false otherwise.
     */
    function _isPriceIdTracked(bytes32 priceId) internal view returns (bool) {
        for (uint256 i = 0; i < priceIds.length; i++) {
            if (priceIds[i] == priceId) {
                return true;
            }
        }
        return false;
    }
}