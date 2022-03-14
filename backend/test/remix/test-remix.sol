// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "remix_accounts.sol";
import "remix_tests.sol"; 
import "../contracts/TOAST.sol";

contract ToastTest2 {
   
    TOASTS toast;
    address ownerAddr;
    address alice;
    address bob;
    uint256 perfectAttendanceTokenId;
    uint256[] dailyAttendanceTokenIds;    

    function beforeAll () public {
        //contract
        toast = new TOASTS();
        //addresses
        ownerAddr = TestsAccounts.getAccount(0);
        alice = TestsAccounts.getAccount(1);
        bob = TestsAccounts.getAccount(2);

        //tokens
        perfectAttendanceTokenId = 6;

        dailyAttendanceTokenIds = new uint256[](4);
        dailyAttendanceTokenIds[0] = 1;
        dailyAttendanceTokenIds[1] = 2;
        dailyAttendanceTokenIds[2] = 3;
        dailyAttendanceTokenIds[3] = 4;

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

    function checkTokenExchangeQualification () public {

        bytes memory data;
        
        toast.setNewToBurnableMapping(perfectAttendanceTokenId, dailyAttendanceTokenIds);

        //Alice gets all 4 tokens   
        toast.toastSingleToSingle(alice, 1, 1, data);
        toast.toastSingleToSingle(alice, 2, 1, data);
        toast.toastSingleToSingle(alice, 3, 1, data);
        toast.toastSingleToSingle(alice, 4, 1, data);

        //bob only gets 3 of the required 4 tokens  
        toast.toastSingleToSingle(bob, 1, 1, data);
        toast.toastSingleToSingle(bob, 2, 1, data);
        toast.toastSingleToSingle(bob, 3, 1, data);
        toast.toastSingleToSingle(bob, 10, 1, data);

        bool aliceQuals = toast.checkExchangeQualification(alice, perfectAttendanceTokenId);
        bool bobQuals = toast.checkExchangeQualification(bob, perfectAttendanceTokenId);

        //alice should qualify bc she has the 4 required daily tokens  
        Assert.equal(aliceQuals, true, "alice should qualify but didn't");
         //bob should not qualify bc he does not have the 4 required daily tokens  
        Assert.equal(bobQuals, false, "bob shouldn't qualify but did");

        uint256[] memory aliceTokensToExchange = new uint256[](4);
        aliceTokensToExchange[0] = 1;
        aliceTokensToExchange[1] = 2;
        aliceTokensToExchange[2] = 3;
        aliceTokensToExchange[3] = 4;

        uint256[] memory aliceTokenAmounts = new uint256[](4);
        aliceTokenAmounts[0] = 1;
        aliceTokenAmounts[1] = 1;
        aliceTokenAmounts[2] = 1;
        aliceTokenAmounts[3] = 1;

        //toast.exchange(alice, perfectAttendanceTokenId, aliceTokensToExchange, aliceTokenAmounts, data);

        //uint256 alicePerfectTokenCount = toast.balanceOf(alice, perfectAttendanceTokenId);
        //Assert.equal(alicePerfectTokenCount, 1, "alice didn't get the perfect attendance token");


         

        //give bob the last required token and check if he's qualified
        toast.toastSingleToSingle(bob, 4, 1, data);
        bobQuals = toast.checkExchangeQualification(bob, perfectAttendanceTokenId);

        //bob should now qualify 
        Assert.equal(bobQuals, true, "bob got the 4th and should qualify but doesn't");
    }

  

}