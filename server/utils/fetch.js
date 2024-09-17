const axios = require("axios");

const ETHERSCAN_API_KEY = "N7VWWA6MDC5NUJK5IFYKM54PAJH8Z2D1XH";
const ETHERSCAN_API_URL = "https://api.etherscan.io/api";

async function fetchTransactions(address) {
  try {
    const response = await axios.get(ETHERSCAN_API_URL, {
      params: {
        module: "account",
        action: "txlist",
        address: address,
        startblock: 0,
        endblock: 99999999,
        sort: "asc",
        apikey: ETHERSCAN_API_KEY,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

async function fetchEthPrice() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    return response.data.ethereum.usd;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return null;
  }
}

function processTransactions(transactions, address) {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  let ethBalance = 0;
  let totalCost = 0;
  let trades = [];
  let totalAmountTraded = 0;
  let log = [];

  transactions.forEach((tx, index) => {
    const txDate = new Date(tx.timeStamp * 1000);
    if (txDate < thirtyDaysAgo) return;

    const amount = parseFloat(tx.value) / 1e18;

    log.push(`Processing transaction ${index + 1}:`);
    log.push(`  Date: ${txDate.toISOString()}`);
    log.push(`  Amount: ${amount.toFixed(4)} ETH`);

    if (tx.from.toLowerCase() === address.toLowerCase()) {
      // Outgoing transaction (sell)
      if (ethBalance > 0) {
        const avgBuyPrice = totalCost / ethBalance;
        const sellPrice = parseFloat(tx.gasPrice) / 1e9; // Using gas price as a proxy for ETH price
        const profit = (sellPrice - avgBuyPrice) * amount;
        trades.push({
          amount,
          profit,
          cost: avgBuyPrice * amount,
          isWin: sellPrice > avgBuyPrice,
        });
        totalAmountTraded += amount;

        log.push(`  Type: Sell`);
        log.push(`  Avg Buy Price: ${avgBuyPrice.toFixed(8)}`);
        log.push(`  Sell Price: ${sellPrice.toFixed(8)}`);
        log.push(`  Profit: ${profit.toFixed(8)} ETH`);
      }
      ethBalance -= amount;
      totalCost = ethBalance > 0 ? totalCost * (1 - amount / ethBalance) : 0;
    } else {
      // Incoming transaction (buy)
      const buyPrice = parseFloat(tx.gasPrice) / 1e9; // Using gas price as a proxy for ETH price
      totalCost += amount * buyPrice;
      ethBalance += amount;

      log.push(`  Type: Buy`);
      log.push(`  Buy Price: ${buyPrice.toFixed(8)}`);
    }

    log.push(`  New Balance: ${ethBalance.toFixed(4)} ETH`);
    log.push(`  New Total Cost: ${totalCost.toFixed(4)}`);
    log.push(``);
  });

  return { trades, totalAmountTraded, log };
}

function calculateStats(trades, totalAmountTraded) {
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const totalCost = trades.reduce((sum, trade) => sum + trade.cost, 0);
  const wins = trades.filter((trade) => trade.isWin).length;

  return {
    totalROI: totalCost > 0 ? totalProfit / totalCost : 0,
    averageWinRate: trades.length > 0 ? wins / trades.length : 0,
    totalAmountTraded,
  };
}

function performConsistencyChecks(stats, trades) {
  let checks = [];

  if (Math.abs(stats.totalROI) > 1) {
    checks.push(
      "Warning: Total ROI seems unusually high or low. Please verify calculations."
    );
  }

  if (stats.averageWinRate < 0 || stats.averageWinRate > 1) {
    checks.push(
      "Error: Win rate should be between 0 and 1. Please check the calculation."
    );
  }

  const sumOfTrades = trades.reduce((sum, trade) => sum + trade.amount, 0);
  if (Math.abs(sumOfTrades - stats.totalAmountTraded) > 0.0001) {
    checks.push(
      "Error: Total amount traded doesn't match sum of individual trades. Please verify calculations."
    );
  }

  return checks;
}

async function analyzeWallet(address) {
  const transactions = await fetchTransactions(address);
  const { trades, totalAmountTraded, log } = processTransactions(
    transactions,
    address
  );
  const stats = calculateStats(trades, totalAmountTraded);
  const currentEthPrice = await fetchEthPrice();

  console.log("\nStatistics for the last 30 days:");
  console.log(`Total ROI: ${(stats.totalROI * 100).toFixed(2)}%`);
  console.log(`Average Win Rate: ${(stats.averageWinRate * 100).toFixed(2)}%`);
  console.log(`Total Amount Traded: ${stats.totalAmountTraded.toFixed(4)} ETH`);

  if (currentEthPrice) {
    console.log(
      `Total Amount Traded in USD: $${(
        stats.totalAmountTraded * currentEthPrice
      ).toFixed(2)}`
    );
  }
}

const walletAddress = "0x320d96bdE68C1E0aF44a7c4E5E2e78eD0894E4e2";
analyzeWallet(walletAddress);
