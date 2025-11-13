const streamValidatorRewardsETH = (address) => {
    return `
    subscription {
        EVM(network: eth) {
            TransactionBalances(
            where: {TokenBalance: {Address: {is: "${address}"}, BalanceChangeReasonCode: {in: [2, 3, 5]}}}
            ) {
            Block {
                Time
                Number
            }
            TokenBalance {
                Currency {
                Symbol
                }
                PreBalance
                PostBalance
                Address
                BalanceChangeReasonCode
                PreBalanceInUSD
                PostBalanceInUSD
            }
            Transaction {
                Hash
            }
            reward: calculate(
                expression: "$TokenBalance_PostBalance - $TokenBalance_PreBalance"
            )
            reward_usd: calculate(
                expression: "$TokenBalance_PostBalanceInUSD - $TokenBalance_PreBalanceInUSD"
            )
            }
        }
    }
`;
};

const streamMultipleValidatorRewardsETH = (addresses) => {
    const addressesString = addresses.map(addr => `"${addr}"`).join(', ');
    return `
    subscription {
        EVM(network: eth) {
            TransactionBalances(
            where: {TokenBalance: {Address: {in: [${addressesString}]}, BalanceChangeReasonCode: {in: [2, 3, 5]}}}
            ) {
            Block {
                Time
                Number
            }
            TokenBalance {
                Currency {
                Symbol
                }
                PreBalance
                PostBalance
                Address
                BalanceChangeReasonCode
                PreBalanceInUSD
                PostBalanceInUSD
            }
            Transaction {
                Hash
            }
            reward: calculate(
                expression: "$TokenBalance_PostBalance - $TokenBalance_PreBalance"
            )
            reward_usd: calculate(
                expression: "$TokenBalance_PostBalanceInUSD - $TokenBalance_PreBalanceInUSD"
            )
            }
        }
    }
`;
};

const streamAllValidatorRewardsETH = () => {
    return `
    subscription {
        EVM(network: eth) {
            TransactionBalances(
            where: {TokenBalance: {BalanceChangeReasonCode: {in: [2, 3, 5]}}}
            ) {
            Block {
                Time
                Number
            }
            TokenBalance {
                Currency {
                Symbol
                }
                PreBalance
                PostBalance
                Address
                BalanceChangeReasonCode
                PreBalanceInUSD
                PostBalanceInUSD
            }
            Transaction {
                Hash
            }
            reward: calculate(
                expression: "$TokenBalance_PostBalance - $TokenBalance_PreBalance"
            )
            reward_usd: calculate(
                expression: "$TokenBalance_PostBalanceInUSD - $TokenBalance_PreBalanceInUSD"
            )
            }
        }
    }
`;
};

export { streamValidatorRewardsETH, streamMultipleValidatorRewardsETH, streamAllValidatorRewardsETH };