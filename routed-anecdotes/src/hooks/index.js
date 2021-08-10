import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(value)
    setValue(event.target.value)
  }

  return {
    name,
    value,
    onChange
  }
}

// modules can have several named exports
// export const useAnotherHook = () => {
//   // ...
// }