const { expect } = require("chai");

describe("LandRegistry", function () {
  let LandRegistry, registry, owner, buyer;

  before(async function () {
    [owner, buyer] = await ethers.getSigners();
    LandRegistry = await ethers.getContractFactory("LandRegistry");
    registry = await LandRegistry.deploy();
  });

  it("Should register land", async function () {
    await registry.registerLand("London", "QmAbC...IPFSHash");
    expect(await registry.landCounter()).to.equal(1);
  });

  it("Should transfer land", async function () {
    // First register a land (if not already done in previous test)
    await registry.registerLand("Paris", "QmXyZ...IPFSHash");
    
    // Transfer the land (ID 1) to buyer
    await registry.transferLand(1, buyer.address);
    
    // Get the land details
    const land = await registry.getLand(1);
    
    // Check the owner is now the buyer
    expect(land.owner).to.equal(buyer.address);
  });
});