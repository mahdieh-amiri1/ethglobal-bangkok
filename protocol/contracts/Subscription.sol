// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {ISubscription} from "./interfaces/ISubscription.sol";

contract Subscription is ISubscription, OAppReceiver, ERC721 {
    address public paymaster;
    mapping(uint256 tokenId => uint256) private _subscriptions;

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

    function mint(
        address to,
        uint256 tokenId,
        uint256 amount
    ) external onlyOwner {
        _safeMint(to, tokenId);
        _subscriptions[tokenId] = amount;
    }

    function setPaymaster(address _payMaster) external onlyOwner {
        _setPaymaster(_payMaster);
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
