const streamValidatorRewardsBSC = (address) => {
    return `
    subscription {
        EVM(network: bsc) {
            TransactionBalances(
            where: {TokenBalance: {Address: {is: "${address}"}, BalanceChangeReasonCode: {eq: 211}}}
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

const streamMultipleValidatorRewardsBSC = (addresses) => {
    const addressesString = addresses.map(addr => `"${addr}"`).join(', ');
    return `
    subscription {
        EVM(network: bsc) {
            TransactionBalances(
            where: {TokenBalance: {Address: {in: [${addressesString}]}, BalanceChangeReasonCode: {eq: 211}}}
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

const streamAllValidatorRewardsBSC = () => {
    return `
    subscription {
        EVM(network: bsc) {
            TransactionBalances(
            where: {TokenBalance: {BalanceChangeReasonCode: {eq: 211}}}
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

export { streamValidatorRewardsBSC, streamMultipleValidatorRewardsBSC, streamAllValidatorRewardsBSC };