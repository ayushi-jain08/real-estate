import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FetchSingleListing, UpdateSingleListing, createListings } from '../Redux/Slice/ListingSlice'
import { useParams } from 'react-router-dom'

const UpdateListing = () => {
    const users = useSelector((state) => state.user)
    const {currentUser} = users
    const listings = useSelector((state) => state.listing)
    const {loading, error, SingleListing} = listings
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
       type: '',
        bedrooms:  '',
        bathrooms: '',
        regularPrice:  '',
        discountPrice:  '',
        offer:  '',
        parking:   '',
        furnished:  '',
    })
    const [images , setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([]);
    const dispatch = useDispatch()
const {listingId} = useParams()

    useEffect(() => {
dispatch(FetchSingleListing(listingId))
setFormData({
  name:  SingleListing?.name || '',
  description:  SingleListing?.description || '',
  address:  SingleListing?.address || '',
 type: SingleListing?.type || '',
  bedrooms:  SingleListing?.bedrooms || '',
  bathrooms:  SingleListing?.bathrooms || '',
  regularPrice:  SingleListing?.regularPrice || '',
  discountPrice:  SingleListing?.discountPrice || '',
  offer: SingleListing?.offer || '',
  parking:  SingleListing?.parking || '',
  furnished:  SingleListing?.furnished || '',
})
// setImages(SingleListing?.images || []);

      setImagePreview(SingleListing?.images);
console.log("ser", SingleListing)

    },[listingId,dispatch])

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
              ...formData,
              type: e.target.id,
            });
          }
          if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
          ) {
            setFormData({
              ...formData,
              [e.target.id]: e.target.checked,
            });
          }
          if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
          ) {
            setFormData({
              ...formData,
              [e.target.id]: e.target.value,
            });
          }
    }
   
const handleImageChange = (e) => {
  const selectedFiles = e.target.files;
  const newImages = [];
  const newImagePreviews = [...imagePreview]

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    const imageURL = URL.createObjectURL(file);
    newImages.push(file); // Push the file object if needed for further processing
    newImagePreviews.push(imageURL); // Push the URL for preview
  }

  setImages((prevImages) => [...prevImages, ...newImages]); // Update the state with the file objects if needed
  setImagePreview(newImagePreviews); // Update the state with image preview URLs
 
};
const handleRemoveImage = (index) => {
  const updatedImage = [...images];
  updatedImage.splice(index, 1); // Remove the image at the specified index
  setImages(updatedImage); 
  const updatedImages = [...imagePreview];
  updatedImages.splice(index, 1); // Remove the image at the specified index
  setImagePreview(updatedImages); 
};
const handleSubmit = (e) => {
    e.preventDefault()
    const {name,
    description,
    address,
    type,
    bedrooms,
    bathrooms,
    regularPrice,
    discountPrice,
    offer,
    parking,
    furnished,} = formData
    dispatch (UpdateSingleListing({id:listingId, name,description,
      address,
      type,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice,
      offer,
      parking,
      furnished,
      userRef: currentUser._id,
      images}))
      dispatch()
}
console.log("images", images)
console.log("imm", imagePreview)
if(loading){
  <div>Loading....</div>
}
  return (
    <>
        <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
      Update Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={handleImageChange}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              multiple
              name='img'
            />
           
          </div>
          <p className='text-red-700 text-sm'>
          </p>
          {imagePreview?.length > 0 &&
            imagePreview?.map((url, index) => (
              <div
                key={index}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading }
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
          {loading ? 'Creating...' : 'Update listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
    </>
  )
}

export default UpdateListing
