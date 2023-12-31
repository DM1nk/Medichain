/*
Name: ProductItem
Description: Product Item (for carousel of product or product listing page)
Properties:
  Img: string
  Name: string
  Price: string
*/

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../buttons'
import { selectUserUid } from '../../redux/features/userSlice'
import {
  addItemToUserCart,
  addToCart
} from '../../redux/features/carts/cartSlice'
import { useSearchMode } from '../../hooks/useSearchMode'

function ProductItem({ product }) {
  const dispatch = useDispatch()
  const userUid = useSelector(selectUserUid)
  const navigate = useNavigate()
  const searchController = useSearchMode()

  const handleAddToCart = (number = 1, product, userUid) => {
    if (userUid) {
      dispatch(addItemToUserCart(userUid, product, number))
    } else {
      dispatch(addToCart({ cartItem: product, number: number }))
    }
  }

  const handleProductImgClick = () => {
    navigate(`/product/${product.uuid}`)
    searchController.handleSearchMode()
  }

  return (
    <div className="m-w-[200px] flex flex-col laptop:flex-row justify-center w-full rounded-lg overflow-hidden relative group shadow-lg shadow-gray-700/40 cursor-pointer">
      <img
        src={product.image?.[0]}
        alt="Product"
        className="w-full laptop:h-[300px] object-cover relative z-10 p-6 mb-40"
        onClick={handleProductImgClick}
      />

      {/* this is information */}
      <div className="laptop:flex hidden w-4/5  absolute bottom-4 z-20 px-4 flex-col items-center bg-light_grey dark:bg-secondary rounded-xl  transition-all duration-200 dark:text-light_grey"onClick={handleProductImgClick}>
        
        <hr className="w-[90%] border-t border-t-dark_primary dark:border-t-light_grey" />
        <div className="w-full py-2">
          <p className="line-clamp-2">
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> {product.gia}
          </p>
        </div>
        <div className="w-full flex mb-4">
          <Button
            Size="small"
            Color="primary"
            onClick={() => handleAddToCart(1, product, userUid)}
          >
            Add to cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center laptop:hidden">
        <p className="text-center text-h5 py-1">
          <strong>Info</strong>
        </p>
        <hr className="w-[90%] border-t border-t-dark_primary dark:border-t-light_grey" />
        <div className="w-full py-2 px-2">
          <p className="line-clamp-2 text-h6">
            <strong>Name:</strong> {product.name}
          </p>
          <p className="line-clamp-2 text-h6">
            <strong>Price:</strong> {product.gia}
          </p>
        </div>
        <div className="px-2 mb-4">
          <Button
            Size="small"
            Color="primary"
            Custom={true}
            Padding="px-4 py-2"
            onClick={() => handleAddToCart(1, product, userUid)}
          >
            <p className="text-h6">Add to cart</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
