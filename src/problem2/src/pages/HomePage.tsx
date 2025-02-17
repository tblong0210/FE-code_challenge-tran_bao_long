import { useEffect, useState } from 'react'

import ic_switch from '../assets/icons/ic_switch.svg'
import ButtonCustom from '../components/atoms/ButtonCustom'
import InputCustom from '../components/atoms/InputCustom'
import DropDownInputCustom, { IItem } from '../components/molecules/DropDownInputCustom'
import { getImageUrl } from '../utils/helper'

type CurrencyModel = {
  currency: string
  date: string
  price: number
}

type IResult = {
  amount: string
  result: string
  toCur: string
  fromCur: string
  valueConvert1: string
  valueConvert2: string
}

const HomePage = () => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [amount, setAmount] = useState('1.00')
  const [result, setResult] = useState<IResult>({
    amount: '1.00',
    result: '1.00',
    toCur: 'USD',
    fromCur: 'USD',
    valueConvert1: '1.00',
    valueConvert2: '1.00'
  })
  const [fromCurrency, setFromCurrency] = useState<IItem>()
  const [toCurrency, setToCurrency] = useState<IItem>()

  const [currencyFromIcon, setCurrencyFromIcon] = useState<string | undefined>(undefined)
  const [currencyToIcon, setCurrencyToIcon] = useState<string | undefined>(undefined)

  const [currencyData, setCurrencyData] = useState<IItem[]>([])

  const handleConvertCurrency = (val: string, isSubmitted: boolean) => {
    if (!isSubmitted) {
      setIsChange(true)
      return
    }
    const fixedVal = parseFloat(val).toFixed(2)
    const fromCurrencyValue = fromCurrency?.value ?? 1
    const toCurrencyValue = toCurrency?.value ?? 1

    const result = (Number(val) * toCurrencyValue) / fromCurrencyValue

    setAmount(fixedVal)
    setResult({
      amount: fixedVal,
      result: result.toFixed(7),
      toCur: toCurrency?.name ?? 'USD',
      fromCur: fromCurrency?.name ?? 'USD',
      valueConvert1: (toCurrencyValue / fromCurrencyValue).toFixed(7),
      valueConvert2: (fromCurrencyValue / toCurrencyValue).toFixed(7)
    })

    setIsSubmit(false)
    setIsChange(false)
  }

  const handleSubmitConvert = () => {
    setIsSubmit(true)
  }

  const handleFromCurrencyChange = (item: IItem) => {
    setFromCurrency(item)
    setIsChange(true)
  }

  const handleToCurrencyChange = (item: IItem) => {
    setToCurrency(item)
    setIsChange(true)
  }

  const handleSwitchCurrency = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setIsChange(true)
  }

  useEffect(() => {
    ;(async () => {
      const res = await fetch('https://interview.switcheo.com/prices.json')
      const data: CurrencyModel[] = await res.json()

      // Group items by currency and select the item with the latest date
      const groupedItems = data.reduce((acc: Record<string, CurrencyModel>, item) => {
        if (!acc[item.currency] || new Date(item.date) > new Date(acc[item.currency].date)) {
          acc[item.currency] = item
        }
        return acc
      }, {})

      const items: IItem[] = await Promise.all(
        Object.values(groupedItems).map(async (item) => {
          const getIcon = await getImageUrl(item.currency)
          return {
            name: item.currency,
            value: item.price,
            date: item.date,
            icon: getIcon
          }
        })
      )
      setCurrencyData(items)

      const getUSD = items.find((item) => item.name === 'USD') ?? { name: 'USD', value: 1, date: '', icon: '' }

      setFromCurrency(getUSD)
      setToCurrency(getUSD)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const getCurrencyIcon = await getImageUrl(fromCurrency?.name ?? '')
      setCurrencyFromIcon(getCurrencyIcon)
    })()
  }, [fromCurrency])

  useEffect(() => {
    ;(async () => {
      const getCurrencyIcon = await getImageUrl(toCurrency?.name ?? '')
      setCurrencyToIcon(getCurrencyIcon)
    })()
  }, [toCurrency])

  return (
    <div
      className={`w-full h-screen 
      relative after:fixed after:block after:content-[''] 
      bg-gradient-to-r from-[#0a146e] via-[#090979] to-[#040f43]
      after:bg-white after:top-[95%] after:left-[120%] after:w-[350%] after:h-full 
      after:rounded-full after:-translate-x-1/2 after:-skew-y-12 after:z-[0] 
      after:animate-wave after:duration-[6000ms] after:ease-in-out after:infinite after:alternate
    `}
    >
      <div className='absolute z-10 top-[5%] left-1/2 -translate-x-1/2 px-10 md:px-32 w-full'>
        <div className='py-12 text-center'>
          <h1 className='mb-4 text-2xl xl:text-5xl font-bold text-white'>
            Convert 1 {fromCurrency?.name} to {toCurrency?.name}
          </h1>
          <p className='text-xl xl:text-2xl text-[#d1d7e2]'>Currency Converter</p>
        </div>
        <div className='w-full bg-white rounded-3xl p-8 shadow-[0px_4px_32px_0px_rgba(0,0,0,0.2)]'>
          <form className='grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-3' onSubmit={(e) => e.preventDefault()}>
            <InputCustom
              inputName='amount'
              labelText='Amount'
              isSubmit={isSubmit}
              inputValue={amount.toString()}
              errorMessage='Please enter a valid amount'
              handleSubmit={handleConvertCurrency}
            />
            <div className='relative grid grid-cols-1 xl:grid-cols-2 gap-3'>
              <DropDownInputCustom
                inputName='fromCurrency'
                labelText='From'
                placeholderText='Type to search...'
                items={currencyData}
                inputValue={fromCurrency?.name ?? ''}
                handleChange={handleFromCurrencyChange}
                prefixElement={<img src={currencyFromIcon} alt='empty' />}
              />
              <div className='absolute top-1/2 z-999 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div
                  className='h-16 w-16 bg-white rounded-full border-gray-200 border-[1px] flex justify-center items-center hover:bg-neutral-100 hover:cursor-pointer'
                  onClick={handleSwitchCurrency}
                >
                  <img className='h-auto w-[60%]' src={ic_switch} alt='empty' />
                </div>
              </div>
              <DropDownInputCustom
                inputName='toCurrency'
                labelText='To'
                placeholderText='Type to search...'
                items={currencyData}
                inputValue={toCurrency?.name ?? ''}
                handleChange={handleToCurrencyChange}
                prefixElement={<img src={currencyToIcon} alt='error' />}
              />
            </div>
          </form>

          <div className='grid grid-cols-1 xl:grid-cols-2 py-8'>
            <div className='text-center xl:text-left'>
              <p className='mb-3 font-bold text-lg'>
                {result.amount} {result.toCur} =
              </p>
              <h1 className='mb-3 text-4xl font-bold'>
                {result.result} {result.fromCur}
              </h1>
              <p className='text-lg text-gray-600'>
                1 {result.fromCur} = {result.valueConvert1} {result.toCur}
              </p>
              <p className='text-lg text-gray-600'>
                1 {result.toCur} = {result.valueConvert2} {result.fromCur}
              </p>
            </div>
            <div className='mt-7 xl:mt-0 xl:flex xl:items-center xl:justify-end'>
              <ButtonCustom isDisabled={!isChange} textButton='Confirm Swap' handleClick={handleSubmitConvert} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
