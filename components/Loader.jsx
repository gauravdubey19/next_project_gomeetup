import React from 'react'
import Image from 'next/image'

const Loader = () => {
    return (
        <div className='flex-center w-full h-screen'>
            <Image src="/icons/loading-circle.svg" alt="loader" width={50} height={50} />
        </div>
    )
}

export default Loader;