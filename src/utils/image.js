
export const isFileAllowed = (file) => {
  const allowedTypes = ["image/png", "image/jpeg"]
  return allowedTypes.includes(file.type)
}