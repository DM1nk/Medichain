import React from 'react'
import Lottie from 'lottie-react'
import empty from '../../assets/animations/empty.json'

export const Empty = () => {
  return (
    <div>
      <Lottie className="w-80 z-30" animationData={empty} loop={true} />
    </div>
  )
}

export default Empty
