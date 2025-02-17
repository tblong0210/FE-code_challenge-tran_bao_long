import ic_empty from '../assets/icons/ic_empty.svg'

const getImageUrl = async (image: string): Promise<string> => {
  try {
    const url = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${image}.svg`
    const response = await fetch(url)
    if (!response.ok) {
      return ic_empty
    }
    return url
  } catch {
    return ic_empty
  }
}

const joinClassNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ')
}
export { getImageUrl, joinClassNames }
