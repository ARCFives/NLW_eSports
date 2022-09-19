import {InputHTMLAttributes} from 'react'

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: inputProps) {
  return (
    <input 
    {...props}
    className='bg-zinc-900 rounded py-3 px-4 placeholder:text-zinc-500 text-sm outline-none'/>
  )
}