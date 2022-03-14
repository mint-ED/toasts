// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_accounts.sol";
import "remix_tests.sol"; 
import "../contracts/TOAST.sol";

contract ToastTest2 {
   
   
    TOASTS toast;
    address ownerAddr;
    address addr2;

    function beforeAll () public {
        toast = new TOASTS();
        ownerAddr = TestsAccounts.getAccount(0);
        addr2 = TestsAccounts.getAccount(1);
    }
    
    function checkContractNameAndSymbol () public {
        Assert.equal(toast.name(), "mintED Toasts", "initial contract should be named mintED Toasts");
        
        string memory newName = "newName";
        string memory newSymbol = "newSymbol";
        toast.setNameAndSymbol(newName, newSymbol);
        Assert.equal(toast.name(), newName, "contract name should change with setter");
        Assert.equal(toast.symbol(), newSymbol, "contract name should change with setter");
    }

    function checkToastSingleToSingle () public {

        uint256 tokenId = 0;
        uint256 amount = 1;
        bytes memory data;

        toast.toastSingleToSingle(ownerAddr, tokenId, amount, data);

        Assert.equal(toast.balanceOf(ownerAddr, tokenId), amount, "balanceOf account's tokenId should be amount");

    }
    

}