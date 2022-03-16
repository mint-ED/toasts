const { expect, Assertion, assert, AssertionError } = require("chai");
const { BigNumber } = require('ethers');

describe("TOAST contract", function () {

  let ToastContract;
  let toast;
  let owner;
  let alice;
  let bob;
  let addrs;
  
  beforeEach(async function () {
    ToastContract = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    [owner, alice, bob, ...addrs] = await ethers.getSigners();
    toast = await ToastContract.deploy();
  });

  describe("Basic Contract Connectivity", function () {
   
    let isAdmin;

    it("Should configure accounts correctly", async function () {
      //isAdmin = await toast.hasRole(ADMIN_ROLE, owner);
      //assert.isTrue(isAdmin);      
      //expect(await toast.).to.equal(owner.address);
    });
  });

  describe("Access Control", function () {
    it("Should add alice to the admin list (to later be replaced with AccessControl.sol functionality)", async function () {
    
      let adminList = [alice.address];
      const tx = await toast.createAdminList(adminList);
      await tx.wait();
  
      assert.isTrue(await toast.isAdmin(alice.address));
      assert.isFalse(await toast.isAdmin(bob.address));

    });
  });

  describe("Basic Contract Functionality", function () {
    it("Should check initial deploy name/symbol are the default and can be updated", async function () {
  
      //check defaults
      expect(await toast.name()).to.equal("mintED Toasts");
      expect(await toast.symbol()).to.equal("TOASTS");
  
      //verify setter/getter with good data
      const tx = await toast.setNameAndSymbol("NewName", "NewSymbol");
      await tx.wait();
  
      expect(await toast.name()).to.equal("NewName");
      expect(await toast.symbol()).to.equal("NewSymbol");
    });
  });
  
  describe("Uri Functionality", function () {
    it("Should check that initial UriOption equals 1", async function () {
  
      expect(await toast.tokenURIOption()).to.equal("1");
    });
  
    it("Should check the ability to update the UriOption to 3", async function () {
      const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
      const toast = await Toast.deploy();
      await toast.deployed();
  
      const setTokenURIOptionTx = await toast.setTokenURIOption(3);
      await setTokenURIOptionTx.wait();
  
      expect(await toast.tokenURIOption()).to.equal("3");
    });
  });

  describe("Token Minting Functionality", function () {

    it("Should verify single-to-single: sunny day", async function () {

        let tokenId = 0;
        let amount = 1;
        let data = [];

        const tx = await toast.toastSingleToSingle(alice.address, tokenId, amount, data);
        await tx.wait();
        
        expect(await toast.balanceOf(alice.address, tokenId)).to.equal(amount);

    });

    it("Should verify many-to-single: sunny day", async function () {

      let tokenIds = [0,1,2,3,4];
      let amounts = [1,1,1,1,1];
      let data = [];

      const tx = await toast.toastManyToSingle(alice.address, tokenIds, amounts, data);
      await tx.wait();
      
      expect(await toast.balanceOf(alice.address, tokenIds[0])).to.equal(amounts[0]);
      expect(await toast.balanceOf(alice.address, tokenIds[1])).to.equal(amounts[1]);

  });
  
  });
  
  describe("Token Exchange Functionality", function () {

    let perfectAttendanceTokenId;
    let dailyAttendanceTokenIds; 
    let aliceTokenIds;
    let aliceAmounts;
    let aliceTokensToExchangeGood;
    let bobTokenIds;
    let bobAmounts;
    let bobTokensToExchange;
    let amountsToExchange4;
    let data = [];
    
    

    beforeEach(async function () {
        perfectAttendanceTokenId    = 6;
        dailyAttendanceTokenIds     = [1,2,3,4];    

        aliceTokenIds               = [0,1,2,3,4];  //perfect attendance, plus orientation token
        aliceAmounts                = [1,1,1,1,1];
        aliceTokensToExchangeGood   = [1,2,3,4];
        aliceTokensToExchangeWrong  = [0,2,3,4];
        aliceTokensToExchangeTooFew = [1,2,3];

        amountsToExchange3          = [1,1,1];
        amountsToExchange4          = [1,1,1,1];

        bobTokenIds                 = [0,1,3,4]; //missed day 2, so no perfect attendance
        bobAmounts                  = [1,1,1,1];
        bobTokensToExchange         = [0,1,3,4];

        const tx = await toast.setNewToBurnableMapping(perfectAttendanceTokenId, dailyAttendanceTokenIds);
        await tx.wait();

        
        
      });

    it("Should validate new-to-burnable token mapping setter/getter", async function () {

      let burnable = await toast.getNewToBurnableMapping(perfectAttendanceTokenId);

      expect(burnable[0]).to.equal(1);
      expect(burnable[1]).to.equal(2);
    });

    it("Should check a user's qualification for exchanging tokens: alice qualified", async function () {

      const tx2 = await toast.toastManyToSingle(alice.address, aliceTokenIds, aliceAmounts, data);
      await tx2.wait();

      let aliceQuals = await toast.checkExchangeQualification(alice.address, perfectAttendanceTokenId);
      assert.isTrue(aliceQuals);
    });

    it("Should check a user's qualification for exchanging tokens: bob not qualified", async function () {

      const tx2 = await toast.toastManyToSingle(bob.address, bobTokenIds, bobAmounts, data);
      await tx2.wait();

      let bobQuals = await toast.checkExchangeQualification(bob.address, perfectAttendanceTokenId);
      assert.isFalse(bobQuals);
    });

    it("Should exchange burnable for new token: alice qualified", async function () {

      //give alice the tokens she needs to exchange
      const tx2 = await toast.toastManyToSingle(alice.address, aliceTokenIds, aliceAmounts, data);
      await tx2.wait();

      //exchange bad tokens for good token
      let exchangedTx = await toast.connect(alice).exchange(alice.address, perfectAttendanceTokenId, aliceTokensToExchangeGood, amountsToExchange4, data);
      await exchangedTx.wait();

      //exchange function returns true
      //assert.isTrue(exchangedTx);
     
      //new token was minted
      expect(await toast.balanceOf(alice.address, perfectAttendanceTokenId)).to.equal(1);

      //old tokens were burned
      for(i=0; i<aliceTokensToExchangeGood.length; i++){
        expect(await toast.balanceOf(alice.address, aliceTokensToExchangeGood[i])).to.equal(0);
      }  

    });

    it("Should not exchange burnable for new token: bob isn't qualified", async function () {

      console.log("bob's address: ", bob.address);
      console.log("bob's tokens ", bobTokenIds);
      console.log("perfect attendance token ", perfectAttendanceTokenId);
      console.log("bob tokens to exchange ", bobTokenIds);
      
      // //give bob the tokens she needs to exchange
      const tx2 = await toast.toastManyToSingle(bob.address, bobTokenIds, bobAmounts, data);
      await tx2.wait();

      await expect(toast.connect(bob).exchange(bob.address, perfectAttendanceTokenId, bobTokensToExchange, amountsToExchange4, data))
        .to.be.revertedWith('account does not qualify for new token');
    });

    it("Should not exchange burnable for new token: alice qualifies but sent wrong tokens to exchange", async function () {
      
      let minted = await toast.balanceOf(alice.address, perfectAttendanceTokenId);
      console.log("alice's perfect attendance token starting count: ", minted);


      //give alice the tokens she needs to exchange
      const tx2 = await toast.toastManyToSingle(alice.address, aliceTokenIds, aliceAmounts, data);
      await tx2.wait();

      console.log("alice's tokens: ", aliceTokenIds);
      console.log("alice's tokens she's trying to exchange: ", aliceTokensToExchangeWrong);


      //exchange bad tokens for good token
      await expect(toast.connect(alice).exchange(alice.address, perfectAttendanceTokenId, aliceTokensToExchangeWrong, amountsToExchange4, data))
        .to.be.revertedWith('user qualifies for new token, but correct tokens were not passed in');
        
           
      //new token should not mint bc the tokens passed in were incorrect
      minted = await toast.balanceOf(alice.address, perfectAttendanceTokenId);
      console.log("alice's perfect attendance token count post-exchange call: ", minted);
      //expect(await toast.balanceOf(alice.address, perfectAttendanceTokenId)).to.equal(0);

      //old tokens were burned
      let existingTokenCount;
       for(i=0; i<aliceTokensToExchangeWrong.length; i++){
         expect(await toast.balanceOf(alice.address, aliceTokensToExchangeWrong[i])).to.be.above(0);
         existingTokenCount = await toast.balanceOf(alice.address, aliceTokensToExchangeWrong[i]);
         console.log("balance of alice's existing tokenId ", i, " is ", existingTokenCount);
       } 
    });
  
  });

});