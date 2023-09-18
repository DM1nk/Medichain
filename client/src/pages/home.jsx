import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import banner1 from '../assets/images/banner03.png'
import banner2 from '../assets/images/banner02.png'
import banner3 from '../assets/images/banner01.png'
import homepage from '../assets/images/bannerInfo.png'
import feature2 from '../assets/images/bannerApp.png'
import { Button, LinkButton } from '../components/buttons'
import { EmailSignUp } from '../components/emails'
import { ProductItemListing } from '../components/products'
import {
  selectStatus,
  selectProducts,
  getProducts
} from '../redux/features/productsSlice'
import { selectCartStatus } from '../redux/features/carts/cartSlice'
import { BannerCarousel, InfoItemList } from '../components/others'
import { useDarkMode } from '../hooks/useDarkMode'
import { PagePreloader } from '../components/preloader'
import BannerCarouselImage from '../components/others/bannerCarouselImage'
import { Loading2 } from '../components/animations/loading2animation'

function HomePage() {
  const { mode: darkMode } = useDarkMode()
  const [productList, setProductList] = useState([])

  const limitedValue = 4
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const products = useSelector(selectProducts)
  const cartStatus = useSelector(selectCartStatus)

  useEffect(() => {
    if (products.length === 0)
      dispatch(getProducts(null, 'create_date', 'desc'))
  }, [])

  useEffect(() => {
    setProductList(products.slice(0, limitedValue))
  }, [products])

  return (
    <div className="w-full flex flex-col relative overflow-hidden">
      {/*Helmet async*/}
      <Helmet>
        <title>Medeli | Đặt thuốc có ngay</title>
      </Helmet>

      {/* banner carousel  */}
      <div className="hidden laptop:block justify-center my-8">
        <BannerCarouselImage
          previewNumber={3}
          space={-200}
          slides={[
            <img
              src={banner1}
              alt="poster"
              className="w-8/12 justify-center"
            />,
            <img
              src={banner2}
              alt="poster"
              className="w-8/12 justify-center"
            />,
            <img src={banner3} alt="poster" className="w-8/12 justify-center" />
          ]}
        />
      </div>
      {/* banner carousel  */}
      <div className="laptop:hidden flex justify-center my-8">
        <BannerCarouselImage
        
          space={50}
          previewNumber={1}
          slides={[
            <img
              src={banner1}
              alt="poster"
              className=" w-9/12 justify-center"
            />,
            <img
              src={banner2}
              alt="poster"
              className="w-9/12 justify-center"
            />,
            <img src={banner3} alt="poster" className="w-9/12 justify-center" />
          ]}
        />
      </div>
      {/* homepage poster */}
      <div>
        <div className="w-full flex justify-center">
          <div className="w-[calc(100%-2rem)] tablet:w-[calc(100%-4rem)] flex flex-col mb-8 relative rounded-3xl shadow-xl shadow-gray-700/50 dark:shadow-gray-500/30 overflow-hidden hover:scale-[1.01] transition-all duration-500 dark:bg-secondary">
            {/* poster content */}
            <div className="w-full px-8 mb-8 flex flex-col justify-between top-1/2 tablet:-translate-y-1/2 right-[5%] tablet:p-10 tablet:absolute tablet:w-1/2 laptop:w-2/5 tablet:h-1/2 tablet:bg-white tablet:dark:bg-secondary">
              <div className="w-full flex flex-col gap-2">
                <p className="text-h3 tablet:text-h3 text-dark_primary dark:text-light_grey">
                  A dedicated medical delivery service
                </p>
                <p className="tablet:block text-body-lg text-dark_primary dark:text-light_grey">
                  Our light-speed delivery service is here to help you get your
                  meds delivered to your door in no time.
                </p>
              </div>
              <div className="flex w-full tablet:w-1/3 mt-6">
                <Link to="/products">
                  <Button Size="medium" Color="secondary" State="default">
                    Shop now
                  </Button>
                </Link>
              </div>
            </div>

            {/* poster image */}
            <div className="w-full">
              <img
                src={homepage}
                alt="poster"
                className="w-1/2 max-h-[700px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* info item */}
        <div className="w-full px-8 py-8 tablet:my-20">
          <InfoItemList />
        </div>

        {/* product item list */}
        <div className="px-8 my-8 tablet:my-20">
          {/* title */}
          <div className="my-4 w-fit">
            <LinkButton
              path="/products"
              color={darkMode === 'light' ? 'dark' : 'light'}
            >
              <p className="text-h3 font-satoshi">All Product</p>
            </LinkButton>
          </div>
          {status === 'idle' ? (
            <ProductItemListing products={productList} />
          ) : (
            <div className="flex justify-center">
              <Loading2 />
            </div>
          )}
        </div>

        {/* feature 1*/}
        <div className="w-full px-8 mb-10 flex flex-col gap-10 tablet:flex-row">
          {/* box - 1 */}
          <div className="flex-1 flex flex-col gap-10 w-full p-8 tablet:p-12 bg-dark_primary dark:bg-secondary text-white tablet:justify-between rounded-xl overflow-hidden shadow-xl shadow-gray-700/40">
            {/* content */}
            <div className="flex flex-col w-full gap-1">
              <p className="text-h4 tablet:text-h2">
                We also have an Mobile app!
              </p>
              <p className="text-body-sm tablet:text-body-lg">
                Download our app to get the best experience, get good deals and
                great advice from top-tier pharmacists
              </p>
            </div>

            {/* button */}
            <div className="w-full flex tablet:block">
              <Link to="/products">
                <Button Size="medium" Color="opaque" State="default">
                  View Products
                </Button>
              </Link>
            </div>
          </div>

          {/* box - 2 : image */}
          <div className="flex-1 w-full rounded-xl overflow-hidden shadow-xl shadow-gray-600/50">
            <img
              src={feature2}
              alt="poster"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* email sign up component */}
        <EmailSignUp />
      </div>

      {cartStatus === 'loading' && <PagePreloader />}
    </div>
  )
}

export default HomePage
