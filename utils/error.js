export const insertErrors = (formError, reason) => {
  for (const index in formError) {
    if (reason.data.hasOwnProperty(index)) {
      formError[index] = reason.data[index]
    }
  }

  return formError
}