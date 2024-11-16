// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ETHGlobalToken is ERC20 {
	uint8 private _decimals;

	constructor(string memory name, string memory symbol, uint8 decimals_) ERC20(name, symbol) {
		_decimals = decimals_;
	}

	function mint(address recipient) public {
		_mint(recipient, 2_500 * 10 ** decimals());
	}

	function decimals() public view override returns (uint8) {
		return _decimals;
	}
}
