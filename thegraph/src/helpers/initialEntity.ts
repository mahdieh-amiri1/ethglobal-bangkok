import { Address, BigInt, Bytes, bigInt, ethereum } from "@graphprotocol/graph-ts";
import {
    SubscriptionStat

} from "../../generated/schema";

import { log } from "matchstick-as";
 
    
export function getSubscriptionStat(): SubscriptionStat{
    let subscriptionStat = SubscriptionStat.load("0x0");
    if (!subscriptionStat) {
        subscriptionStat = new SubscriptionStat("0x0");
        subscriptionStat.mintedCount = BigInt.zero();
        subscriptionStat.chainName = "sepolia"; 
    }
  
    return subscriptionStat;
  }

