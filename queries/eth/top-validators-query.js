const topValidatorsQueryETH = (hoursAgo = 24, limit = 10) => {
    return `  
    query MyQuery {
  EVM(network: eth) {
    TransactionBalances(
      limit: {count: ${limit}}
      orderBy: {descendingByField: "Total_tip_native"}
      where: {TokenBalance: {BalanceChangeReasonCode: {eq: 5}}, Block: {Time: {since_relative: {hours_ago: ${hoursAgo}}}}}
    ) {
      TokenBalance {
        Address
        BalanceChangeReasonCode
        Currency {
          Name
          Symbol
          SmartContract
        }
      }
      Post: sum(of: TokenBalance_PostBalance)
      Post_USD: sum(of: TokenBalance_PostBalanceInUSD)
      Pre: sum(of: TokenBalance_PreBalance)
      Pre_USD: sum(of: TokenBalance_PreBalanceInUSD)
      Total_tip_native: calculate(expression: "$Post - $Pre")
      Total_tip_usd: calculate(expression: "$Post_USD - $Pre_USD")
      number_of_tips: count
    }
  }
}
`;
};

export default topValidatorsQueryETH;