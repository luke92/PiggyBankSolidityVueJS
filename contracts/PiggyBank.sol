//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract PiggyBank {
    address payable public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'You are not the rightful owner');
        _;
    }

    function deposit() public payable {}

    function withdraw() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
