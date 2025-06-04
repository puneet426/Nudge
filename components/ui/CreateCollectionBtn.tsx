"use client";
import React, { useState } from 'react'
import { Button } from './button';
import CreateCollectionSheet from './CreateCollectionSheet';

function CreateCollectionBtn() {
    const [open,setOpen] = useState(false);
    const handleOpenChange = (open: boolean)=>setOpen(open);
  return (
    <div className='w-full rounded-md bg-gradient-to-r  from-pink-500 via-red-500 to-yellow-500 p-[1px] '>
    <Button className='dark:text-white w-full dark:bg-neutral-950 bg-white'
    onClick={()=> setOpen(true)} >
    <span className='bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent'>Create Collection</span>
    </Button>
    <CreateCollectionSheet open={open} onOpenChange = {handleOpenChange}/>
    </div>
  )
}

export default CreateCollectionBtn