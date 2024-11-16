// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISubscription} from "./interfaces/ISubscription.sol";

interface IOracle {
    function getAssetPrice(address asset) external view returns (int64);
    function Decimals() external view returns (int256);
}

contract Subscription is ISubscription, OAppReceiver, ERC721 {
    address public paymaster;
    IOracle public Oracle;
    mapping(uint256 tokenId => uint256) private _subscriptions;
    uint256 private _currentTokenId; // Counter for token IDs

    constructor(
        address _endpoint,
        address _owner
    ) OAppCore(_endpoint, _owner) ERC721("McGas", "MCG") {}

    function subscriptionOf(
        uint256 tokenId
    ) public view virtual returns (uint256) {
        _requireOwned(tokenId);
        return _subscriptions[tokenId];
    }

    function spendSubscription(
        uint256 tokenId,
        uint256 amount
    ) external onlyPaymaster {
        _spendSubscription(tokenId, amount);
    }

    function validateSubscription(
        uint256 tokenId,
        address owner,
        uint256 amount
    ) external view returns (bool isValid) {
        return _ownerOf(tokenId) == owner && subscriptionOf(tokenId) >= amount;
    }

    function mintWithERC20(
        address to,
        address tokenAddress,
        uint256 tokenAmount
    ) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        require(tokenAmount > 0, "Token amount must be greater than zero");

        // Transfer ERC20 tokens from the user to the contract
        IERC20 token = IERC20(tokenAddress);
        require(
            token.transferFrom(msg.sender, address(this), tokenAmount),
            "Token transfer failed"
        );

        // Get the price of the ERC20 token in ETH from the Oracle
        int64 tokenPriceInETH = Oracle.getAssetPrice(tokenAddress);
        require(tokenPriceInETH > 0, "Invalid token price from Oracle");

        // Calculate the equivalent ETH value of the transferred tokens
        uint256 equivalentETH = (uint256(tokenPriceInETH) * tokenAmount) / 10 ** uint256(Oracle.Decimals());

        // Increment the token ID counter
        uint256 newTokenId = ++_currentTokenId;

        // Mint the subscription NFT with the calculated ETH balance
        _safeMint(to, newTokenId);
        _subscriptions[newTokenId] = equivalentETH;
    }

    function setPaymaster(address _payMaster) external onlyOwner {
        _setPaymaster(_payMaster);
    }

    function setOracleAddress(address _oracleAddress) external onlyOwner {
        require(_oracleAddress != address(0), "Invalid Oracle address");
        Oracle = IOracle(oracleAddress);
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal override {
        (uint256 tokenId, uint256 amount) = abi.decode(
            payload,
            (uint256, uint256)
        );
        _spendSubscription(tokenId, amount);
    }

    function _subscriptionOf(
        uint256 tokenId
    ) internal view virtual returns (uint256) {
        return _subscriptions[tokenId];
    }

    function _spendSubscription(uint256 tokenId, uint256 amount) internal {
        _requireOwned(tokenId);
        _requireEnoughSubscription(tokenId, amount);
        _subscriptions[tokenId] -= amount;
        emit Spend(tokenId, amount);
    }

    function _requireEnoughSubscription(
        uint256 tokenId,
        uint256 amount
    ) internal view {
        uint256 subscription = subscriptionOf(tokenId);
        if (subscription < amount) {
            revert NotEnoughSubscription(tokenId, amount, subscription);
        }
    }

    function _setPaymaster(address _newPayMaster) internal {
        if (_newPayMaster == address(0)) {
            revert InvalidPaymaster(address(0));
        }
        address oldPaymaster = paymaster;
        paymaster = _newPayMaster;
        emit PaymasterChanged(oldPaymaster, paymaster);
    }

    modifier onlyPaymaster() {
        if (paymaster != _msgSender()) {
            revert UnauthorizedPaymaster(msg.sender);
        }
        _;
    }

    function _requireOwned(uint256 tokenId) internal view returns (address) {
        address owner = _ownerOf(tokenId);
        require(owner != address(0), "nonexistent token!");
        return owner;
    }
}
