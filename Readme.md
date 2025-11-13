# Staking Rewards API

> A powerful SDK for monitoring validator rewards, earnings, and identifying top-performing validators on Ethereum and BSC networks. Built for staking pools, validator operators, and DeFi platforms that need real-time insights into validator performance.

[![npm version](https://img.shields.io/npm/v/validator-balance-api.svg)](https://www.npmjs.com/package/staking-rewards-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

The Staking Rewards API provides comprehensive tools for tracking and analyzing validator performance across Ethereum and Binance Smart Chain (BSC) networks. Whether you're running a staking pool, managing multiple validators, or building analytics dashboards, this SDK gives you the data you need to optimize returns and monitor validator earnings.

### Key Features

- **📊 Top Validators Discovery**: Identify the highest-earning validators on Ethereum and BSC
- **💰 Reward Tracking**: Monitor validator rewards and earnings in real-time
- **📈 Historical Analysis**: Analyze validator performance over custom time periods
- **🔄 Real-time Streaming**: Get live updates via WebSocket subscriptions
- **🌐 Multi-Validator Support**: Track single validators, multiple validators, or all validators simultaneously
- **⚡ High Performance**: Built on [Bitquery's API](https://docs.bitquery.io/docs/intro/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards=api) for fast, reliable data access

## 🚀 Quick Start

### Installation

```bash
npm install staking-rewards-api
```

### Basic Usage

```javascript
import {
    getTopValidatorsETH,
    getValidatorRewardsETH,
    streamValidatorRewardsETH
} from 'validator-balance-api';

const token = 'YOUR_BITQUERY_TOKEN';

// Find top 10 validators on Ethereum (last 24 hours)
const topValidators = await getTopValidatorsETH(token, 24, 10);
console.log('Top Validators:', topValidators);

// Get rewards for a specific validator
const rewards = await getValidatorRewardsETH(
    token,
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    24 // hours ago
);
console.log('Validator Rewards:', rewards);

// Stream live validator rewards
const ws = await streamValidatorRewardsETH(token, '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', {
    onData: (data) => {
        console.log('New reward:', data);
    },
    onError: (error) => {
        console.error('Stream error:', error);
    }
});
```

## 📚 API Reference

### Query Functions

#### `getTopValidatorsETH(token, hoursAgo, limit)`

Get the top-performing validators on Ethereum network.

**Parameters:**
- `token` (string, required): Your Bitquery OAuth token
- `hoursAgo` (number, optional): Hours to look back (default: 24)
- `limit` (number, optional): Number of validators to return (default: 10)

**Returns:** JSON object containing top validators data with total tips, rewards, and performance metrics

**Example:**
```javascript
const topValidators = await getTopValidatorsETH(token, 48, 20);
```

#### `getTopValidatorsBSC(token, hoursAgo, limit)`

Get the top-performing validators on BSC network.

**Parameters:** Same as `getTopValidatorsETH`

**Example:**
```javascript
const topValidators = await getTopValidatorsBSC(token, 24, 15);
```

#### `getValidatorRewardsETH(token, address, hoursAgo)`

Get historical rewards for a specific Ethereum validator.

**Parameters:**
- `token` (string, required): Your Bitquery OAuth token
- `address` (string, required): The validator address
- `hoursAgo` (number, optional): Hours to look back (default: 24)

**Returns:** JSON object containing validator rewards, balance changes, and transaction details

**Example:**
```javascript
const rewards = await getValidatorRewardsETH(
    token,
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    72 // last 3 days
);
```

#### `getValidatorRewardsBSC(token, address, hoursAgo)`

Get historical rewards for a specific BSC validator.

**Parameters:** Same as `getValidatorRewardsETH`

**Example:**
```javascript
const rewards = await getValidatorRewardsBSC(token, '0x...', 24);
```

### Streaming Functions

All streaming functions return a WebSocket connection and accept an `options` object with:
- `onData` (function): Callback for incoming data
- `onError` (function): Callback for errors
- `autoCloseMs` (number): Automatically close connection after N milliseconds

#### `streamValidatorRewardsETH(token, address, options)`

Stream live validator rewards for a single Ethereum validator.

**Example:**
```javascript
const ws = await streamValidatorRewardsETH(token, '0x...', {
    onData: (data) => console.log('Reward update:', data),
    onError: (err) => console.error('Error:', err),
    autoCloseMs: 60000 // close after 1 minute
});
```

#### `streamMultipleValidatorRewardsETH(token, addresses, options)`

Stream rewards for multiple Ethereum validators simultaneously.

**Example:**
```javascript
const addresses = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    '0x8ba1f109551bD432803012645Hac136c22C92900'
];
const ws = await streamMultipleValidatorRewardsETH(token, addresses, {
    onData: (data) => console.log('Multi-validator update:', data)
});
```

#### `streamAllValidatorRewardsETH(token, options)`

Stream rewards for all Ethereum validators (use with caution - high volume).

**Example:**
```javascript
const ws = await streamAllValidatorRewardsETH(token, {
    onData: (data) => console.log('All validators update:', data)
});
```

#### BSC Streaming Functions

- `streamValidatorRewardsBSC(token, address, options)`
- `streamMultipleValidatorRewardsBSC(token, addresses, options)`
- `streamAllValidatorRewardsBSC(token, options)`

Usage is identical to Ethereum functions, but for BSC network.

## 🏗️ Use Cases

### For Staking Pools

- **Performance Benchmarking**: Compare your validators against top performers
- **Reward Optimization**: Identify which validators generate the highest returns
- **Real-time Monitoring**: Track validator performance as rewards are distributed
- **Portfolio Management**: Monitor multiple validators across different networks

### For Validator Operators

- **Earnings Tracking**: Monitor your validator's rewards in real-time
- **Performance Analysis**: Analyze historical performance to optimize operations
- **Competitive Intelligence**: See how you rank against other validators
- **Alert Systems**: Set up automated monitoring for reward events

### For DeFi Platforms

- **Analytics Dashboards**: Build comprehensive validator analytics
- **APY Calculations**: Calculate accurate APY based on real validator performance
- **Risk Assessment**: Evaluate validator reliability and performance
- **Data Integration**: Integrate validator data into your platform

## 🔑 Getting Your API Token

This SDK uses Bitquery's Transaction Balance API for [Ethereum](https://docs.bitquery.io/docs/blockchain/Ethereum/balances/transaction-balance-tracker/#filter-by-val/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api) and [BSC](https://docs.bitquery.io/docs/blockchain/BSC/transaction-balance-tracker/#filter-by-val/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)to fetch blockchain data. To get started:

1. Visit [Bitquery IDE](https://ide.bitquery.io/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api) to create an account
2. Generate your [Access Token](https://account.bitquery.io/user/api_v2/access_tokens/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-ap) by following [these instructions](https://docs.bitquery.io/docs/authorisation/how-to-generate/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-ap)
3. Start querying validator data immediately

Bitquery provides comprehensive blockchain data APIs for Ethereum, BSC, and 40+ other networks. Perfect for building analytics, monitoring tools, and data-driven applications.

## 📊 Data Structure

### Top Validators Response

```json
{
  "data": {
    "EVM": {
      "TransactionBalances": [
        {
          "TokenBalance": {
            "Address": "0x...",
            "Currency": {
              "Name": "Ethereum",
              "Symbol": "ETH"
            }
          },
          "Total_tip_native": "1.23456789",
          "Total_tip_usd": "2345.67",
          "number_of_tips": 42
        }
      ]
    }
  }
}
```

### Validator Rewards Response

```json
{
  "data": {
    "EVM": {
      "TransactionBalances": [
        {
          "Post": "100.5",
          "Pre": "99.2",
          "Total_tip_native": "1.3",
          "Total_tip_usd": "2345.67",
          "number_of_tips": 5
        }
      ]
    }
  }
}
```

## ⚙️ Configuration

### Environment Variables

You can set your Bitquery token as an environment variable:

```bash
export BITQUERY_TOKEN=your_token_here
```

Then use it in your code:

```javascript
const token = process.env.BITQUERY_TOKEN;
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Bitquery Documentation](https://docs.bitquery.io/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)
- [Bitquery IDE](https://ide.bitquery.io/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)
- [Ethereum Validator Documentation](https://docs.bitquery.io/docs/blockchain/Ethereum/balances/transaction-balance-tracker/eth-validator-balance-tracker/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)
- [BSC Validator Documentation](https://docs.bitquery.io/docs/blockchain/BSC/transaction-balance-tracker/bsc-validator-balance-tracker/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)

## 💬 Support

- **Bitquery Community**: [Join our Telegram](https://t.me/Bloxy_info/?utm_source=github&utm_medium=validator-balance-api&utm_campaign=staking-rewards-api)

## 🌟 Why Choose This SDK?

- **Built for Staking**: Designed specifically for staking pools and validator operators
- **Real-time Data**: Get instant updates on validator performance
- **Multi-Network**: Support for both Ethereum and BSC
- **Production Ready**: Ready to use for staking pools and DeFi platforms
- **Well Documented**: Comprehensive API documentation and examples
- **Active Maintenance**: Regularly updated with new features and improvements

---

**Made with ❤️ by the Bitquery Team**

*Empowering staking pools and validator operators with actionable blockchain insights.*
