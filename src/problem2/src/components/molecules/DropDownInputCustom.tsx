import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import ic_close from '../../assets/icons/ic_close.svg'
import ic_dropdown from '../../assets/icons/ic_dropdown.svg'
import useDebounce from '../../hooks/useDebounce'
import { joinClassNames } from '../../utils/helper'
import InputCustom from '../atoms/InputCustom'

export interface IItem {
  name: string
  value: number
  date?: string
  icon?: string
}

type DropDownInputCustomProps = {
  labelText: string
  inputValue: string
  items: IItem[]
  customClass?: string
  inputName?: string
  placeholderText?: string
  errorMessage?: string
  prefixElement?: ReactNode
  handleChange: (item: IItem) => void
}
const DropDownInputCustom: React.FC<DropDownInputCustomProps> = ({
  labelText,
  inputValue,
  items,
  customClass = '',
  inputName,
  placeholderText,
  errorMessage,
  prefixElement,
  handleChange
}) => {
  const containerItemsRef = useRef<HTMLDivElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputText, setInputText] = useState('')

  const [debouncedSearchTerm, isLoading] = useDebounce(inputText, 500)
  const listItem = useMemo(() => {
    const currentItemSelected = items.find((item: IItem) => item.name === inputValue)

    return items.reduce(
      (acc: IItem[], item: IItem) => {
        if (item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) && item.name !== inputValue) {
          acc.push(item)
        }
        return acc
      },
      currentItemSelected ? [currentItemSelected] : []
    )
  }, [items, debouncedSearchTerm, inputValue])

  const handleChangeDropdown = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen)
    if (isOpen) {
      setInputText('')
    } else {
      setInputText(inputValue)
    }
  }

  const handleSuffixDropdown = () => {
    handleChangeDropdown(!isDropdownOpen)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSelectItem = (item: IItem) => {
    handleChange(item)
    handleChangeDropdown(false)
  }

  useEffect(() => {
    setInputText(inputValue)
    console.log('inputValue', inputValue)
  }, [inputValue])

  return (
    <div className='relative'>
      <InputCustom
        customClass={customClass}
        inputName={inputName}
        labelText={isDropdownOpen ? '' : labelText}
        inputValue={inputText}
        placeholderText={placeholderText}
        isFocus={isDropdownOpen}
        errorMessage={errorMessage}
        containerRef={containerItemsRef!}
        handleChange={handleChangeInput}
        handleFocus={handleChangeDropdown}
        prefixElement={isDropdownOpen ? <></> : prefixElement}
        suffixElement={
          <div id='prefix-icon' className='w-10 h-10' onClick={handleSuffixDropdown}>
            {isLoading ? <ClipLoader size={25} /> : <img src={isDropdownOpen ? ic_close : ic_dropdown} alt='error' />}
          </div>
        }
      />
      {isDropdownOpen && (
        <div
          ref={containerItemsRef}
          className='absolute w-full max-h-80 overflow-auto z-1000 mt-2 bg-white border border-solid border-gray-200 rounded-lg'
        >
          <ul>
            {listItem.map((val: IItem) => (
              <li key={Math.random()} onClick={() => handleSelectItem(val)}>
                <div
                  className={joinClassNames(
                    'flex items-center gap-3 text-lg font-medium px-3 py-4 hover:cursor-pointer hover:bg-neutral-100',
                    val.name === inputValue ? 'bg-neutral-100' : ''
                  )}
                >
                  <div className='h-6 w-6'>
                    <img src={val.icon} alt='empty' />
                  </div>
                  <p className=''>{val.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropDownInputCustom
