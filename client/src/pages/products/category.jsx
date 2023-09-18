import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import clubImg from '../../assets/images/bannerApp.png'
import { EmailField } from '../../components/emails'
import { ProductItemListing } from '../../components/products'
import { Button } from '../../components/buttons'
import {
  selectProductsCategory,
  getCategoryProducts,
  selectLastVisibleCategory,
  selectStatusCategory,
  setClearCategory
} from '../../redux/features/productsSlice'
import Loading2 from '../../components/animations/loading2animation'

function Category() {
  //declare dispatch
  const dispatch = useDispatch()
  //select state
  const categoryStatus = useSelector(selectStatusCategory)
  const productsCategory = useSelector(selectProductsCategory)
  const lastVisibleCategory = useSelector(selectLastVisibleCategory)
  //catogory
  let { category } = useParams()
  category = category.replace('-', ' ')
  category = category.charAt(0).toUpperCase() + category.slice(1)

  //fetch data
  useEffect(() => {
    dispatch(setClearCategory())
    dispatch(getCategoryProducts(null, category))
  }, [category])

  const handleLoadMore = () => {
    dispatch(getCategoryProducts(lastVisibleCategory, category))
  }

  return (
    <div className="relative">
      {/*Helmet async*/}
      <Helmet>
        <title>{category.toUpperCase()}</title>
      </Helmet>

      {/* this is Header component */}
      <header className=" bg-light_grey dark:bg-secondary py-8 px-6 laptop:bg-white dark:laptop:bg-dark_secondary laptop:pt-20 laptop:pb-3 laptop:px-20 relative z-30 flex justify-center">
        <h2 className="text-center w-fit h-fit px-6 py-2 rounded-full shadow-md shadow-gray-700/50 dark:shadow-light_grey/60 mb-10 text-h2 text-white laptop:mb-8 bg-accent font-satoshi dark:bg-secondary dark:text-light_grey">
          {category}
        </h2>
      </header>

      {/* this is list Product component */}
      <div className="px-6 py-7 laptop:px-20 laptop:pb-10 relative z-20">
        {/* Product Item Lists */}
        {categoryStatus === 'idle' ? (
          <ProductItemListing products={productsCategory} />
        ) : (
          <div className="flex justify-center">
            <Loading2 />
          </div>
        )}

        {/* Load more Button */}
        <div className="flex mt-8 laptop:max-w-[180px] laptop:mx-auto">
          <Button Color="secondary" onClick={handleLoadMore}>
            View products
          </Button>
        </div>
      </div>

      {/* this is Contact component */}
      <div className="hidden laptop:flex">
        <img className="w-1/2" src={clubImg} alt="join club" />
        <div className="w-1/2 object-cover p-[70px] flex flex-col justify-between text-secondary">
          <div>
            <h3 className="text-h2">
              With our great pharmacist, we can help enhance your health
            </h3>
            <p className="text-h5 my-5 w-4/5">
              Sign up for our healthcare newsletter and receive exclusive offers
              on new ranges, sales, pop up stores and more
            </p>
          </div>
          <EmailField Color="light" />
        </div>
      </div>
    </div>
  )
}

export default Category
