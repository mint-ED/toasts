// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_accounts.sol";
import "remix_tests.sol"; 
import "../contracts/TOAST.sol";

contract ToastTest2 {
   
   
    TOASTS toast;
    function beforeAll () public {
        toast = new TOASTS();
    }
    
    function checkContractNameAndSymbol () public {
        Assert.equal(toast.name(), "mintED Toasts", "initial contract should be named mintED Toasts");
        
        string memory newName = "newName";
        string memory newSymbol = "newSymbol";
        toast.setNameAndSymbol(newName, newSymbol);
        Assert.equal(toast.name(), newName, "contract name should change with setter");
        Assert.equal(toast.symbol(), newSymbol, "contract name should change with setter");
    }
    

}
