import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { joinClassNames } from '../../utils/helper'

type InputCustomProps = {
  labelText: string
  inputValue: string
  customClass?: string
  inputName?: string
  placeholderText?: string
  errorMessage?: string
  isFocus?: boolean
  isSubmit?: boolean
  prefixElement?: ReactNode
  suffixElement?: ReactNode
  containerRef?: React.RefObject<HTMLDivElement | null>
  handleSubmit?: (val: string, isSubmitted: boolean) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFocus?: (isFocus: boolean) => void
}

const InputCustom: React.FC<InputCustomProps> = ({
  labelText,
  inputValue,
  inputName,
  customClass = '',
  placeholderText,
  errorMessage,
  prefixElement,
  suffixElement,
  isFocus,
  isSubmit,
  containerRef,
  handleSubmit,
  handleChange,
  handleFocus
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const containerInputRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState(inputValue ?? '')
  const [isError, setIsError] = useState(false)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e)
      return
    }

    const textValue = e.target.value
    if (isNaN(Number(textValue))) {
      setIsError(true)
    } else {
      setIsError(false)
    }
    setValue(textValue)
  }

  const getIdFromReactNode = (node: ReactNode): string | null => {
    // Check if the node is a valid React element
    if (React.isValidElement(node)) {
      // Narrow down the type to access `props`
      const element = node as React.ReactElement<{ id?: string }>
      if (typeof element.props.id === 'string') {
        return element.props.id
      }
    }
    return null
  }

  const handleFocusInput = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get the id of the suffix element if it exists and check if the click event is on the suffix element
    const idSuffixElement = getIdFromReactNode(suffixElement)
    if (e.target instanceof HTMLElement && e.target.parentElement?.id == idSuffixElement) {
      return
    }

    inputRef.current?.focus()
    if (handleFocus) {
      handleFocus(true)
    }
  }

  useEffect(() => {
    setValue(inputValue)
  }, [inputValue])

  useEffect(() => {
    if (isFocus) {
      inputRef.current?.focus()
    }
  }, [isFocus])

  useEffect(() => {
    if (isSubmit && handleSubmit) {
      handleSubmit(value, true)
    }
  }, [isSubmit])

  useEffect(() => {
    if (!isError && value !== inputValue && handleSubmit) {
      handleSubmit(value, false)
    }
  }, [value])

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isError || value === '') {
        setValue(inputValue)
        setIsError(false)

        if (handleSubmit) {
          handleSubmit(inputValue, true)
        }
      }

      if (
        containerRef?.current &&
        !containerRef.current.contains(event.target as Node) &&
        containerInputRef.current &&
        !containerInputRef.current.contains(event.target as Node)
      ) {
        if (handleFocus) {
          handleFocus(false)
        }
      }
    }

    const handleActiveInput = () => {
      setValue('')
    }

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside)
    const currentContainerInputRef = containerInputRef.current
    currentContainerInputRef?.addEventListener('click', handleActiveInput)

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      currentContainerInputRef?.removeEventListener('click', handleActiveInput)
    }
  }, [handleFocus, containerRef, inputValue, isError, handleSubmit, value])

  return (
    <div
      ref={containerInputRef}
      className={joinClassNames(
        customClass,
        'relative h-24 rounded-lg border border-solid border-gray-200 bg-white px-7 py-2 text-2xl hover:bg-neutral-100 has-[input:focus]:bg-neutral-100 has-[input:focus]:outline-3 has-[input:focus]:outline-blue-400'
      )}
      onClick={handleFocusInput}
    >
      <label
        htmlFor={inputName ? inputName : 'input-custom'}
        className='absolute top-2 text-lg font-normal text-gray-600'
      >
        {labelText}
      </label>

      <div className='absolute top-8 flex gap-5 w-[calc(100%-3.8rem)]'>
        {prefixElement}
        <input
          ref={inputRef}
          name={inputName ? inputName : 'input-custom'}
          className='w-full border-none outline-none hover:cursor-default'
          type='text'
          placeholder={placeholderText}
          value={value}
          onChange={handleChangeInput}
        />
        {suffixElement}
      </div>
      {isError && <p className='absolute bottom-[-1.5rem] left-2 text-red-500 text-sm'>{errorMessage}</p>}
    </div>
  )
}

export default InputCustom
