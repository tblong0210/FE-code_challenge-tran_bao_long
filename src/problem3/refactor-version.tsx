interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
}
interface FormattedWalletBalance {
  currency: string
  amount: number
  formatted: string
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props // Problem 1: Unused variable
  const balances = useWalletBalances()
  const prices = usePrices()

  // Problem 2: Type of blockchain is any, should be string instead of any type
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100
      case "Ethereum":
        return 50
      case "Arbitrum":
        return 30
      case "Zilliqa":
        return 20
      case "Neo":
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    // Problem 3: Filter and sort the balances has more conditions,
    // should be refactored to a separate function for better readability
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount <= 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        return rightPriority - leftPriority
      })
  }, [balances])

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    }
  })

  // Problem 4: To ensure keys are unique and prevent unnecessary re-rendering
  // when the array of values changes (e.g., adding or removing elements),
  // use the currency property as the key instead of the array index.
  const rows = sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return <div {...rest}>{rows}</div>
}
