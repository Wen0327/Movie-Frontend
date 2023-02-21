import React from 'react'

export default function FormInput({name,placeholder,label, ...rest }) {
  return (

    <div className='flex flex-col-reverse'>
                    <input  className=" bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary p-1 w-full text-lg outline-none dark:text-white peer transition" 
                            id={name}
                            name={name}
                            placeholder={placeholder}
                            {...rest}/>
                    <label className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start' 
                           htmlFor={name}>
                            {label}
                            </label>
                </div>
    
   
  )
}
