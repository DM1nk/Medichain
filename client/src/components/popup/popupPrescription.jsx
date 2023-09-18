import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import { Popup } from '.'
import { Button } from '../buttons'
import { Controller, Input, Select } from '../fields'
import { PopupAddressSchema } from '../../validations/popupAddress'
import { selectUserUid } from '../../redux/features/userSlice'
import {
  addNewAddress,
  updateAddr
} from '../../redux/features/address/addressSlice'

function PopupPrescription({ type = 'create', address, onBack = () => {} }) {
  const provinceAPI = 'https://provinces.open-api.vn/api/'
  const [numFields, setNumFields] = useState(1)
  // Create useState:
  const [province, setProvince] = useState([])
  const [district, setDistrict] = useState([])
  const [ward, setWard] = useState([])

  //daclare redux and state
  const dispatch = useDispatch()
  const userUid = useSelector(selectUserUid)

  const [newAddress, setNewAddress] = useState({
    Firstname: '',
    Lastname: '',
    Birth: '',
    PhoneNumber: '',
    Address: ''
    // Province: '',
    // District: '',
    // Ward: '',
    // ProvinceCode: '',
    // DistrictCode: '',
    // WardCode: ''
  })
  //Handle add more fields:
  function handleMoreFields() {
    setNumFields(numFields + 1)
  }
  //Handle delete fields:
  const handleDeleteField = (index) => {
    const fields = [...Array(numFields)].filter((_, i) => i !== index);
    setNumFields(fields.length);
  }
  // get Province:
  const getProvince = () => {
    fetch(provinceAPI)
      .then((res) => res.json())
      .then((res) => setProvince(res))
      .catch((err) => console.log(err))
  }

  // get District:
  const getDistrict = (provinceCode) => {
    fetch(`${provinceAPI}p/${provinceCode}/?depth=2`)
      .then((res) => res.json())
      .then((res) => setDistrict(res.districts))
      .catch((err) => console.log(err))
  }

  // get Ward:
  const getWard = (districtCode) => {
    fetch(`${provinceAPI}d/${districtCode}/?depth=2`)
      .then((res) => res.json())
      .then((res) => setWard(res.wards))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (type === 'update') {
      setNewAddress({
        ...newAddress,
        Name: address.Name,
        PhoneNumber: address.PhoneNumber,
        // Province: address.Province,
        // ProvinceCode: address.ProvinceCode,
        // District: address.District,
        // DistrictCode: address.DistrictCode,
        // Ward: address.Ward,
        // WardCode: address.WardCode,
        Address: address.Address
      })
      //assign default value for update form
      setValue('fullname', address.Name)
      setValue('phone', address.PhoneNumber)
      // setValue('province', address.ProvinceCode)
      // setValue('district', address.DistrictCode)
      // setValue('ward', address.WardCode)
      setValue('address', address.Address)
      // fetch data
      // setDistrict(getDistrict(address.ProvinceCode))
      // setWard(getWard(address.DistrictCode))
    }
    setProvince(getProvince())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle change input field:
  const handleChange = useCallback(
    (e) => {
      const key = e.target.name
      const value = e.target.value

      // if (key === 'province') {
      //   setNewAddress({
      //     ...newAddress,
      //     Province: e.target.options[e.target.selectedIndex].text,
      //     ProvinceCode: value,
      //     District: '',
      //     DistrictCode: '',
      //     Ward: '',
      //     WardCode: ''
      //   })
      //   setValue('district', '')
      //   setValue('ward', '')
      //   getDistrict(value)
      // }

      // if (key === 'district') {
      //   setNewAddress({
      //     ...newAddress,
      //     District: e.target.options[e.target.selectedIndex].text,
      //     DistrictCode: value,
      //     Ward: '',
      //     WardCode: ''
      //   })
      //   setValue('ward', '')
      //   getWard(value)
      // }

      // if (key === 'ward') {
      //   setNewAddress({
      //     ...newAddress,
      //     Ward: e.target.options[e.target.selectedIndex].text,
      //     WardCode: value
      //   })
      // }

      if (key === 'fullname') {
        setNewAddress({
          ...newAddress,
          Name: value
        })
      }

      // if (key === 'phone') {
      //   setNewAddress({
      //     ...newAddress,
      //     PhoneNumber: value
      //   })
      // }

      if (key === 'address') {
        setNewAddress({
          ...newAddress,
          Address: value
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newAddress]
  )

  // declare useForm validation:
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullname: '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      address: ''
    },
    resolver: yupResolver(PopupAddressSchema)
  })

  // handle update Address
  const handleUpdateAddress = (data) => {
    // HANDLE HERE
    //create new address
    if (type === 'create') {
      dispatch(addNewAddress(userUid, newAddress))
    }
    if (type === 'update') {
      dispatch(updateAddr(userUid, address.Id, newAddress))
    }
    onBack()
  }

  return (
    <>
      <Popup>
     
          <form
            className="w-full laptop:w-[450px] laptop:h-30"
            onSubmit={handleSubmit(handleUpdateAddress)}
          >
            <h3 className="text-center mb-3 laptop:text-left text-body-lg font-semibold laptop:mb-5">
              {type === 'create'
                ? 'Create new prescription'
                : 'Edit prescription'}
            </h3>
            <div className="flex flex-col gap-4 overflow-y-auto">
              <div className="flex gap-2">
                {/* First Name field */}
                <Controller
                  {...{
                    control,
                    register,
                    name: 'firstname',
                    rules: {},
                    type: 'text',
                    placeholder: 'First name',
                    className:
                      'border border-1 rounded-lg border-border_grey w-1/2 h-9 px-2 outline-primary/60',
                    handleChange: (e) => handleChange(e),
                    render: (props) => <Input {...props} />
                  }}
                />
                {/*Last Name field */}
                <Controller
                  {...{
                    control,
                    register,
                    name: 'lastname',
                    rules: {},
                    type: 'text',
                    placeholder: 'Last name',
                    className:
                      'border border-1 rounded-lg border-border_grey w-1/2 h-9 px-2 outline-primary/60',
                    handleChange: (e) => handleChange(e),
                    render: (props) => <Input {...props} />
                  }}
                />
              </div>

              {/*error*/}
              <div
                className={` flex gap-2 ${
                  errors.fullname || errors.phone ? '' : 'hidden'
                }`}
              >
                <p className="flex-1 text-body-sm text-red-700">
                  {errors.fullname?.message}
                </p>
                {/* <p className="flex-1 text-body-sm text-red-700">
                {errors.phone?.message}
              </p> */}
              </div>

              {/*address field*/}
              <Controller
                {...{
                  control,
                  register,
                  name: 'patient',
                  type: 'text',
                  placeholder: "Patient's age",
                  className:
                    'border border-1 rounded-lg border-border_grey w-full h-9 px-2 outline-primary/60',
                  handleChange: (e) => handleChange(e),
                  render: (props) => <Input {...props} />
                }}
              />
              {/*Date of birth*/}
              <label className="flex-col ">
                <p className="w-32 mb-2">Date signed</p>
                <Controller
                  {...{
                    control,
                    register,
                    name: 'birth',
                    type: 'date',
                    className: 'py-2 px-2 dark:bg-light_grey/40 rounded-md',
                    handleChange: () => {},
                    render: (props) => <Input {...props} />
                  }}
                />
                <p className="text-red-600">{errors.birth?.message}</p>
              </label>
              {/*Rx: Medication / Strength / Frequency*/}

              {[...Array(numFields)].map((_, i) => (
                <label className="flex-col ">
                  <p className="w-100 mb-2">Medication {i + 1}</p>
                  <Controller
                    {...{
                      control,
                      register,
                      name: 'treatment',
                      type: 'text',
                      placeholder: 'Rx: Medication / Strength / Frequency',
                      className:
                        'border border-1 rounded-lg border-border_grey w-full h-9 px-2 outline-primary/60',
                      handleChange: () => {},
                      render: (props) => <Input {...props} />
                    }}
                  />
                  <p className="text-red-600">{errors.birth?.message}</p>
                  <Button
                    Color="red"
                    Custom={true}
                    Padding="px-8 mx-40 my-5 py-1"
                    onClick={() => handleDeleteField(i)}
                  >
                    Delete
                  </Button>
                </label>
              ))}
              <Button
                Color="ghost"
                Custom={true}
                Padding="px-8 py-1"
                onClick={() => handleMoreFields()}
              >
                Add more
              </Button>
              {/*Doctor field*/}
              <Controller
                {...{
                  control,
                  register,
                  name: 'address',
                  type: 'text',
                  placeholder: 'Prescription doctor',
                  className:
                    'border border-1 rounded-lg border-border_grey w-full h-9 px-2 outline-primary/60',
                  handleChange: (e) => handleChange(e),
                  render: (props) => <Input {...props} />
                }}
              />
              <p
                className={`flex-1 text-body-sm text-red-700 ${
                  errors.address ? '' : 'hidden'
                }`}
              >
                {errors.address?.message}
              </p>

              <div className="flex justify-center laptop:justify-end gap-3">
                <div className="">
                  <Button
                    Color="ghost"
                    Custom={true}
                    Padding="px-8 py-1"
                    onClick={() => onBack()}
                  >
                    Back
                  </Button>
                </div>
                {type === 'create' ? (
                  <div>
                    <Button Color="primary" Custom={true} Padding="px-8 py-1">
                      Create prescription
                    </Button>
                  </div>
                ) : (
                  ''
                )}
                {type === 'update' ? (
                  <div>
                    <Button Color="primary" Custom={true} Padding="px-8 py-1">
                      Save prescription
                    </Button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </form>
  
      </Popup>
    </>
  )
}

export default PopupPrescription
