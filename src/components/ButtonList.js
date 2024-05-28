import React from 'react'
import Button from './Button';

const list = ["All","Gaming","Songs","Comedy","Live","Movies","Web series","Cooking","Cricket","News"]

const ButtonList = () => {
  return (
    <div className='flex'>
        {list.map((item)=><Button key={item} name={item}/>)}
        
    </div>
  )
}

export default ButtonList