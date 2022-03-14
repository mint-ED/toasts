// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let ToastContract;
  let toast;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    ToastContract = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    toast = await ToastContract.deploy();
  });

  describe("Basic Contract Connectivity", function () {
    it("Should configure accounts correctly", async function () {
  
      expect(await toast.owner()).to.equal(owner.address);
    });
  });

  describe("Toast Basic Contract Functionality", function () {
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
  
  describe("Toast Uri Functionality", function () {
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


});