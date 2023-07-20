import { forwardRef } from 'react'
import '../styles/Observer.css'

const Observer = forwardRef<HTMLDivElement>((props, ref): JSX.Element => {
  return (
    <div 
      className='observer' 
      {...props} 
      ref={ref} 
    />
  )
})

export default Observer