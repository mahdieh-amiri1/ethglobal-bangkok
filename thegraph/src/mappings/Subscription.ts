import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Transfer, SubscriptionMinted } from "../../generated/Subscription/Subscription";

import { SubscriptionNFT, SubscriptionStat } from "../../generated/schema";
import { getSubscriptionStat } from "../helpers/initialEntity";

import { log } from "matchstick-as";

// export function handleTransfer(event: Transfer): void {
//   let eventParams = event.params;

//   let subscriptionNFT = new SubscriptionNFT(eventParams.tokenId.toHexString());

//   let subscriptionStat = getSubscriptionStat(BigInt.fromI32(42161));
// //   let subscriptionStat = SubscriptionStat.load(
// //     "42161" //chainId
// //   );
// //   if (subscriptionStat == null) {
// //     log.warning("Undefined SubscriptionStat {}", [
// //         "42161", //chainId: arbitrum-one=42161 or  sepolia=11155111
// //     ]);
// //     return;
// //   }

//   subscriptionStat.chainName = "arbitrum";
//   subscriptionStat.mintedCount = subscriptionStat.mintedCount.plus(BigInt.fromI32(1));
  
//   subscriptionNFT.owner = eventParams.from;
//   subscriptionNFT.isActive = true;
//   subscriptionNFT.transactionHash = event.transaction.hash.toHexString();
//   subscriptionNFT.blockNumber = event.block.number;
//   subscriptionNFT.mintedAt = event.block.timestamp;
//   subscriptionNFT.chainName = "arbitrum";

//   subscriptionNFT.save();
//   subscriptionStat.save();
// }


export function handleSubscriptionMinted(event: SubscriptionMinted): void {
  let eventParams = event.params;

  let subscriptionNFT = new SubscriptionNFT(eventParams.tokenId.toHexString());
 
  let subscriptionStat = getSubscriptionStat();

  // let subscriptionStat = SubscriptionStat.load(
  //   "42161" //chainId
  // );
  // if (subscriptionStat == null) {
  //   log.warning("Undefined SubscriptionStat {}", [
  //       "42161", //chainId: arbitrum-one=42161 or  sepolia=11155111
  //   ]);
  //   return;
  // }

  subscriptionStat.chainName = "arbitrum";
  subscriptionStat.mintedCount = subscriptionStat.mintedCount.plus(BigInt.fromI32(1));
  
  subscriptionNFT.owner = eventParams.owner;
  subscriptionNFT.isActive = true;
  subscriptionNFT.transactionHash = event.transaction.hash.toHexString();
  subscriptionNFT.blockNumber = event.block.number;
  subscriptionNFT.mintedAt = event.block.timestamp;
  subscriptionNFT.chainName = "arbitrum";
  subscriptionNFT.amount = eventParams.amount;

  subscriptionNFT.save();
  subscriptionStat.save();
}