// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleERC20 is ERC20, ERC20Burnable, ERC20Capped, Ownable {
	uint8 private immutable _decimals;

	constructor(
		string memory name_,
		string memory symbol_,
		uint8 decimals_,
		uint256 cap_,
		address owner_,
		address initialRecipient_,
		uint256 initialSupply_
	) ERC20(name_, symbol_) ERC20Capped(cap_) Ownable(owner_) {
		_decimals = decimals_;
		if (initialSupply_ > 0) {
			_mint(initialRecipient_, initialSupply_);
		}
	}

	function decimals() public view override returns (uint8) {
		return _decimals;
	}

	function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Capped) {
		super._update(from, to, value);
	}

	function mint(address to, uint256 amount) external onlyOwner {
		_mint(to, amount);
	}
}

contract SimpleERC721 is ERC721, Ownable {
	// 간단한 URI 저장소 구현
	mapping(uint256 => string) private _tokenURIs;

	constructor(string memory name_, string memory symbol_, address owner_) ERC721(name_, symbol_) Ownable(owner_) {}

	function tokenURI(uint256 tokenId) public view override returns (string memory) {
		_requireOwned(tokenId);
		return _tokenURIs[tokenId];
	}

	function mint(address to, uint256 tokenId, string memory uri) external onlyOwner {
		_safeMint(to, tokenId);
		_tokenURIs[tokenId] = uri;
	}
}

contract TokenFactory {
	event TokenCreated(address indexed token, address indexed owner, string name, string symbol, uint8 decimals, uint256 cap);
	event NftCreated(address indexed token, address indexed owner, string name, string symbol);

	function createToken(
		string memory name_,
		string memory symbol_,
		uint8 decimals_,
		uint256 cap_,
		address owner_,
		address initialRecipient_,
		uint256 initialSupply_
	) external returns (address token) {
		SimpleERC20 t = new SimpleERC20(name_, symbol_, decimals_, cap_, owner_, initialRecipient_, initialSupply_);
		token = address(t);
		emit TokenCreated(token, owner_, name_, symbol_, decimals_, cap_);
	}

	function createNFT(
		string memory name_,
		string memory symbol_,
		address owner_
	) external returns (address token) {
		SimpleERC721 t = new SimpleERC721(name_, symbol_, owner_);
		token = address(t);
		emit NftCreated(token, owner_, name_, symbol_);
	}
}


