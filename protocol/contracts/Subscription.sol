// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISubscription} from "./interfaces/ISubscription.sol";

interface IOracle {
    function getAssetPrice(address asset) external view returns (int64);
    function Decimals() external view returns (int256);
}

contract Subscription is ISubscription, OAppReceiver, ERC721 {
    address public paymaster;
    IOracle public oracle;
    uint256 private _currentTokenId; // Counter for token IDs
    mapping(uint256 => uint256) private _subscriptions;

    // Modifiers
    modifier onlyPaymaster() {
        require(msg.sender == paymaster, "Unauthorized paymaster");
        _;
    }

    constructor(
        address _endpoint,
        address _owner
    ) OAppCore(_endpoint, _owner) ERC721("McGas", "MCG") Ownable(_owner) {}

    function subscriptionOf(uint256 tokenId) public view returns (uint256) {
        _requireTokenOwned(tokenId);
        return _subscriptions[tokenId];
    }

    function validateSubscription(
        uint256 tokenId,
        address owner,
        uint256 amount
    ) external view returns (bool) {
        return _ownerOf(tokenId) == owner && subscriptionOf(tokenId) >= amount;
    }

    function mintWithERC20(
        address to,
        address tokenAddress,
        uint256 tokenAmount
    ) external onlyOwner {
        _validateTokenTransfer(tokenAddress, tokenAmount);
        uint256 equivalentETH = _calculateEquivalentETH(
            tokenAddress,
            tokenAmount
        );
        uint256 newTokenId = _mintSubscription(to, equivalentETH);

        emit SubscriptionMinted(newTokenId, to, equivalentETH);
    }

    function mintWithNative(address to) external payable {
        require(msg.value > 0, "Insufficient balance");
        uint256 newTokenId = _mintSubscription(msg.sender, msg.value);

        emit SubscriptionMinted(newTokenId, to, msg.value);
    }

    function spendSubscription(
        uint256 tokenId,
        uint256 amount
    ) external onlyPaymaster {
        _spendSubscription(tokenId, amount);
    }

    function setOracleAddress(address _oracleAddress) external onlyOwner {
        require(_oracleAddress != address(0), "Invalid Oracle address");
        oracle = IOracle(_oracleAddress);
    }

    function setPaymaster(address _paymaster) external onlyOwner {
        _setPaymaster(_paymaster);
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

    function _spendSubscription(uint256 tokenId, uint256 amount) internal {
        _requireTokenOwned(tokenId);
        _requireEnoughSubscription(tokenId, amount);
        _subscriptions[tokenId] -= amount;

        emit Spend(tokenId, amount);
    }

    function _mintSubscription(
        address to,
        uint256 value
    ) internal returns (uint256) {
        uint256 newTokenId = ++_currentTokenId;
        _safeMint(to, newTokenId);
        _subscriptions[newTokenId] = value;

        return newTokenId;
    }

    function _calculateEquivalentETH(
        address tokenAddress,
        uint256 tokenAmount
    ) internal view returns (uint256) {
        int256 tokenPriceInETH = oracle.getAssetPrice(tokenAddress);
        require(tokenPriceInETH > 0, "Invalid token price from Oracle");
        uint256 price = uint256(tokenPriceInETH);

        int256 decimals = oracle.Decimals();
        return (price * tokenAmount) / (10 ** uint256(decimals));
    }

    function _validateTokenTransfer(
        address tokenAddress,
        uint256 tokenAmount
    ) internal {
        require(tokenAddress != address(0), "Invalid token address");
        require(tokenAmount > 0, "Token amount must be greater than zero");

        IERC20 token = IERC20(tokenAddress);
        require(
            token.transferFrom(msg.sender, address(this), tokenAmount),
            "Token transfer failed"
        );
    }

    function _requireEnoughSubscription(
        uint256 tokenId,
        uint256 amount
    ) internal view {
        uint256 subscription = subscriptionOf(tokenId);
        require(subscription >= amount, "Insufficient subscription balance");
    }

    function _setPaymaster(address _newPaymaster) internal {
        require(_newPaymaster != address(0), "Invalid paymaster address");
        address oldPaymaster = paymaster;
        paymaster = _newPaymaster;

        emit PaymasterChanged(oldPaymaster, _newPaymaster);
    }

    function _requireTokenOwned(uint256 tokenId) internal view returns (address) {
        address owner = _ownerOf(tokenId);
        require(owner != address(0), "Nonexistent token!");
        return owner;
    }
}
