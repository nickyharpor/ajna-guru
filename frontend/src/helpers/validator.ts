export const isAkash = (text: string) => {
  const regex = /^(akash1)[\w]{38}$/
  return regex.test(text)
}
