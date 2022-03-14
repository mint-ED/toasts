// We import Chai to use its asserting functions here.
const { expect, Assertion, assert, AssertionError } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("TOAST contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

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
    it("Should configure accounts correctly", async function () {
      expect(await toast.owner()).to.equal(owner.address);
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
    let data = [];
    

    before(async function () {
        perfectAttendanceTokenId = 6;
        dailyAttendanceTokenIds = [1,2,3,4];
        aliceTokenIds = [0,1,2,3,4];  //perfect attendance, plus orientation token
        aliceAmounts = [1,1,1,1,1];
        bobTokenIds = [0,1,3,4]; //missed day 2, so no perfect attendance
        bobAmounts = [1,1,1,1];
      });

    it("Should New-to-burnable token mapping setter/getter", async function () {

      const tx = await toast.setNewToBurnableMapping(perfectAttendanceTokenId, dailyAttendanceTokenIds);
      await tx.wait();

      let burnable = await toast.getNewToBurnableMapping(perfectAttendanceTokenId);

      expect(burnable[0]).to.equal(1);
      expect(burnable[1]).to.equal(2);
    });

    it("Should check a user's qualification for exchanging tokens: alice qualified", async function () {

      //set new-burnable token mapping
      const tx = await toast.setNewToBurnableMapping(perfectAttendanceTokenId, dailyAttendanceTokenIds);
      await tx.wait();

      const tx2 = await toast.toastManyToSingle(alice.address, aliceTokenIds, aliceAmounts, data);
      await tx2.wait();

      let aliceQuals = await toast.checkExchangeQualification(alice.address, perfectAttendanceTokenId);
      assert.isTrue(aliceQuals);
     
    });

    it("Should check a user's qualification for exchanging tokens: bob not qualified", async function () {

      //set new-burnable token mapping
      const tx = await toast.setNewToBurnableMapping(perfectAttendanceTokenId, dailyAttendanceTokenIds);
      await tx.wait();

      const tx2 = await toast.toastManyToSingle(bob.address, bobTokenIds, bobAmounts, data);
      await tx2.wait();

      let bobQuals = await toast.checkExchangeQualification(bob.address, perfectAttendanceTokenId);
      assert.isFalse(bobQuals);
     
    });
  
  });

});