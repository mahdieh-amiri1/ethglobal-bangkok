// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import {IOAppReceiver} from "@layerzerolabs/oapp-evm/contracts/oapp/interfaces/IOAppReceiver.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ISubscription is IOAppReceiver, IERC721 {
    event SubscriptionMinted(
        uint256 tokenId,
        address indexed to,
        string tokenURI,
        uint256 value
    );
    event Spend(uint256 indexed tokenId, uint256 indexed amount);
    event PaymasterChanged(
        address indexed oldPaymaster,
        address indexed newPaymaster
    );

    error NotEnoughSubscription(
        uint256 tokenId,
        uint256 required,
        uint256 remaining
    );
    error InvalidPaymaster(address paymaster);
    error UnauthorizedPaymaster(address paymaster);

    function paymaster() external view returns (address);

    function subscriptionOf(
        uint256 tokenId
    ) external view returns (uint256 remaining);

    function spendSubscription(uint256 tokenId, uint256 amount) external;

    function validateSubscription(
        uint256 tokenId,
        address owner,
        uint256 amount
    ) external view returns (bool isValid);

    function mint(address to, uint256 tokenId, uint256 amount) external;

    function setPaymaster(address _payMaster) external;
}
