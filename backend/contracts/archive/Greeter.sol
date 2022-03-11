//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    string private aToast;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function getAToast() public view returns (string memory) {
        return aToast;
    }

    function setAToast(string memory _one, string memory _two) public {
        console.log("Changing greeting from '%s' to '%s' '%s'", aToast, _one, _two);
        aToast = _one;
    }
}
