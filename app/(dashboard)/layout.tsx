import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center'>
        <div className='flex flex-grow w-full justify-center dark:bg-neutral-950'>
            <div className='w-[920px]  flex flex-col flex-glow px-4 py-12 '>{children}</div>
        </div>
    </div>
  )
}

export default layout