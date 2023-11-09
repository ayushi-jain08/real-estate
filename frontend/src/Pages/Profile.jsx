import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUserLoginUser, UserLogOut } from '../Redux/Slice/UserSlice'
import { Link } from 'react-router-dom';
import { DeleteListing, GetUserListing } from '../Redux/Slice/ListingSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.user)
  const users = useSelector((state) => state.listing)
  const {userListing, loading, error} = users

  console.log("userListing", userListing)
  const handleChange = (e) => {

  }
  const handleDeleteUser = () => {
dispatch(DeleteUserLoginUser(currentUser._id))

  }
  const handleSignOut = () => {
dispatch(UserLogOut())
  }
  const handleSubmit = (e) => {
   e.preventDefault()
  }
  const handleShowListing = () => {
dispatch(GetUserListing(currentUser._id))
  }
  const handleListingDelete = async(id) => {
await dispatch(DeleteListing(id))
dispatch(GetUserListing(currentUser._id))
  }

  return (
    <>
       <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
          <img
          onClick={() => fileRef.current.click()}
          src={currentUser.pic}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          // disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          Update
          {/* {loading ? 'Loading...' : 'Update'} */}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <button onClick={handleShowListing} className='text-green-700 w-full'>
        Show Listings
      </button>
      {userListing && userListing.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.images[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default Profile
