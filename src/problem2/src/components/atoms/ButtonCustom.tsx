type ButtonCustomProps = {
  textButton: string
  isDisabled?: boolean
  handleClick: () => void
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ textButton, isDisabled, handleClick }) => {
  return (
    <button
      disabled={isDisabled}
      className='w-full xl:w-fit px-20 py-3 rounded-xl text-xl xl:text-2xl font-medium text-white bg-[#207FE6] hover:cursor-pointer hover:opacity-90 disabled:bg-gray-400 disabled:hover:cursor-not-allowed disabled:hover:opacity-100'
      onClick={handleClick}
    >
      {textButton}
    </button>
  )
}

export default ButtonCustom
