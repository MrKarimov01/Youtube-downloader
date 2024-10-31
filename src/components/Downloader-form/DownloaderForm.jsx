import React from 'react'
import { HomeIcon } from '../../assets/icons'
import InputForm from '../Input-form/InputForm'

const DownloaderForm = ({activeIndex}) => {
  return (
    <div className='form'>
        <HomeIcon color={activeIndex === 0 ? '#6E41E2' : activeIndex === 2 ? '#FF5B79' : "#69C9D0"} />
        <InputForm activeIndex={activeIndex} />
    </div>
  )
}

export default DownloaderForm