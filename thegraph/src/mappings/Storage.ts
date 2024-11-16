import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { SetData } from "../../generated/Storage/Storage";

import { StorageData } from "../../generated/schema";
import { log } from "matchstick-as";

export function handleSetData(event: SetData): void {
  let eventParams = event.params;

  let storageData = new StorageData(event.transaction.hash.toHexString());
  storageData.userWallet = eventParams.userWallet;
  storageData.balance = eventParams.balance;
  storageData.number = eventParams.number;
  storageData.transactionHash = event.transaction.hash.toHexString();
  storageData.blockNumber = event.block.number;
  storageData.storedAt = event.block.timestamp;
  storageData.chainName = "arbitrum"

  storageData.save();
}
