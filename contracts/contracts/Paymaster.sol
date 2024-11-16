// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.20;

// import {BasePaymaster} from "@account-abstraction/contracts/core/BasePaymaster.sol";
// import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
// import "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
// import {OptionsBuilder} from "@layerzerolabs/oapp-evm/contracts/oapp/libs/OptionsBuilder.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import {ISubscription} from "./interfaces/ISubscription.sol";

// contract Paymaster is BasePaymaster, OAppSender {
//     using OptionsBuilder for bytes;

//     event SubscriptionChanged(
//         address indexed oldSubscription,
//         address indexed newSubscription
//     );

//     error InvalidSubscription(address subscription);

//     uint32 GAS_LIMIT = 100000;
//     ISubscription public subscription;
//     uint32 immutable eid;
//     address immutable bundler;

//     constructor(
//         address _endpoint,
//         address _owner,
//         IEntryPoint _entryPoint,
//         address _bundler,
//         uint32 _eid
//     ) OAppCore(_endpoint, _owner) BasePaymaster(_entryPoint) {
//         bundler = _bundler;
//         eid = _eid;
//     }

//     function _validatePaymasterUserOp(
//         PackedUserOperation calldata userOp,
//         bytes32,
//         uint256 maxCost
//     )
//         internal
//         view
//         override
//         returns (bytes memory context, uint256 validationData)
//     {
//         // Decode paymasterAndData to extract EntryPoint ID and subscription token ID
//         (, uint32 _eid, uint256 tokenId) = abi.decode(
//             userOp.paymasterAndData,
//             (address, uint32, uint256)
//         );

//         // Validate based on EntryPoint ID
//         if (_eid == eid) {
//             // Validate the subscription using the provided token ID, user address, and max cost
//             require(
//                 subscription.validateSubscription(
//                     tokenId,
//                     userOp.sender,
//                     maxCost
//                 ),
//                 "invalid subscription"
//             );
//         } else {
//             // Ensure the transaction origin is the authorized bundler for cross-chain transactions
//             require(tx.origin == bundler, "auth: sender is not the bundler");
//         }

//         // Encode the context for the post-operation handler
//         context = abi.encode(_eid, tokenId);

//         // Return context and validation data (validationData is 0 for unrestricted)
//         validationData = 0;
//     }

//     function _postOp(
//         PostOpMode,
//         bytes calldata context,
//         uint256 actualGasCost,
//         uint256
//     ) internal override {
//         (uint32 _eid, uint256 _tokenId) = abi.decode(
//             context,
//             (uint32, uint256)
//         );
//         if (_eid == eid) {
//             subscription.spendSubscription(_tokenId, actualGasCost);
//         } else {
//             _send(_eid, _tokenId, actualGasCost);
//         }
//     }

//     function setSubscription(address _subscription) external onlyOwner {
//         _setSubscription(_subscription);
//     }

//     function _send(uint32 dstEid, uint256 tokenId, uint256 amount) internal {
//         bytes memory payload = abi.encode(tokenId, amount);
//         bytes memory options = OptionsBuilder
//             .newOptions()
//             .addExecutorLzReceiveOption(GAS_LIMIT, 0);
//         MessagingFee memory fee = _quote(dstEid, payload, options, false);

//         _lzSend(
//             dstEid,
//             payload,
//             options,
//             MessagingFee(fee.nativeFee, 0),
//             payable(address(this))
//         );
//     }

//     function _setSubscription(address _newSubscription) internal {
//         if (_newSubscription == address(0)) {
//             revert InvalidSubscription(address(0));
//         }
//         address _oldSubscription = address(subscription);
//         subscription = ISubscription(_newSubscription);
//         emit SubscriptionChanged(_oldSubscription, _newSubscription);
//     }
// }
