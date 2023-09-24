import React from 'react'
import Lottie from 'lottie-react'
import loadingProduct from '../../assets/animations/loadingproducts.json'

export const Loading2 = () => {
  return <Lottie className='w-1/4' animationData={loadingProduct} loop={true} />
}

export default Loading2

