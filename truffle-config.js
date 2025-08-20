module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545, // Default Ganache GUI port
        network_id: "*", // Match any network ID
        gas: 8000000  // Higher gas limit for safety
      }
    },
    compilers: {
      solc: {
        version: "0.8.20", // Must match pragma in .sol
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    }
  };