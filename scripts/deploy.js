const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Taqi Tourism contracts to Base Sepolia...");

  // Deploy TaqiCredits
  console.log("📝 Deploying TaqiCredits...");
  const TaqiCredits = await hre.ethers.getContractFactory("TaqiCredits");
  const creditsContract = await TaqiCredits.deploy();
  await creditsContract.waitForDeployment();
  const creditsAddress = await creditsContract.getAddress();
  console.log("✅ TaqiCredits deployed to:", creditsAddress);

  // Deploy TaqiNFT
  console.log("🎨 Deploying TaqiNFT...");
  const TaqiNFT = await hre.ethers.getContractFactory("TaqiNFT");
  const nftContract = await TaqiNFT.deploy();
  await nftContract.waitForDeployment();
  const nftAddress = await nftContract.getAddress();
  console.log("✅ TaqiNFT deployed to:", nftAddress);

  // Deploy TaqiTourism
  console.log("🏔️ Deploying TaqiTourism...");
  const TaqiTourism = await hre.ethers.getContractFactory("TaqiTourism");
  const tourismContract = await TaqiTourism.deploy(nftAddress, creditsAddress);
  await tourismContract.waitForDeployment();
  const tourismAddress = await tourismContract.getAddress();
  console.log("✅ TaqiTourism deployed to:", tourismAddress);

  // Configure permissions
  console.log("🔧 Configuring permissions...");
  await nftContract.transferOwnership(tourismAddress);
  await creditsContract.addAuthorizedMinter(tourismAddress);
  console.log("✅ Permissions configured");

  // Create some sample routes
  console.log("🗺️ Creating sample routes...");
  const sampleRoutes = [
    {
      name: "Machu Picchu Trail",
      location: "Cusco, Peru",
      distance: 26,
      difficulty: 4,
      pointsReward: 100,
      creditsReward: 50,
      checkpoints: ["Km 82", "Wayllabamba", "Pacaymayo", "Wiñay Wayna", "Machu Picchu"]
    },
    {
      name: "Lake Titicaca Expedition",
      location: "Puno, Peru",
      distance: 120,
      difficulty: 3,
      pointsReward: 80,
      creditsReward: 40,
      checkpoints: ["Puno Port", "Uros Islands", "Taquile Island", "Amantani Island"]
    },
    {
      name: "Nazca Lines Flight",
      location: "Nazca, Peru",
      distance: 300,
      difficulty: 2,
      pointsReward: 60,
      creditsReward: 30,
      checkpoints: ["Nazca Airport", "Hummingbird", "Spider", "Monkey", "Astronaut"]
    }
  ];

  for (const route of sampleRoutes) {
    await tourismContract.createRoute(
      route.name,
      route.location,
      route.distance,
      route.difficulty,
      route.pointsReward,
      route.creditsReward,
      route.checkpoints
    );
    console.log(`✅ Created route: ${route.name}`);
  }

  // Create sample event
  console.log("🎉 Creating sample event...");
  const eventStartTime = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
  const eventEndTime = eventStartTime + 3600; // 1 hour duration
  
  await tourismContract.createEvent(
    "Andean Music Festival",
    "Join us for a celebration of traditional Andean music and dance.",
    "Cusco, Peru",
    eventStartTime,
    eventEndTime,
    100,
    50,
    25
  );
  console.log("✅ Created event: Andean Music Festival");

  console.log("\n🎊 Deployment Summary:");
  console.log("====================");
  console.log("TaqiCredits:", creditsAddress);
  console.log("TaqiNFT:", nftAddress);
  console.log("TaqiTourism:", tourismAddress);
  console.log("\n📋 Contract Addresses for Frontend:");
  console.log(`export const CONTRACT_ADDRESSES = {
  TAQI_CREDITS: "${creditsAddress}",
  TAQI_NFT: "${nftAddress}",
  TAQI_TOURISM: "${tourismAddress}"
};`);

  // Verify contracts if on testnet
  if (hre.network.name === "baseSepolia") {
    console.log("\n🔍 Verifying contracts...");
    try {
      await hre.run("verify:verify", {
        address: creditsAddress,
        constructorArguments: [],
      });
      console.log("✅ TaqiCredits verified");
    } catch (error) {
      console.log("❌ TaqiCredits verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: nftAddress,
        constructorArguments: [],
      });
      console.log("✅ TaqiNFT verified");
    } catch (error) {
      console.log("❌ TaqiNFT verification failed:", error.message);
    }

    try {
      await hre.run("verify:verify", {
        address: tourismAddress,
        constructorArguments: [nftAddress, creditsAddress],
      });
      console.log("✅ TaqiTourism verified");
    } catch (error) {
      console.log("❌ TaqiTourism verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

