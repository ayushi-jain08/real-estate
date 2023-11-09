import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRegister } from '../Redux/Slice/UserSlice'

const Signup = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [pic , setPic] = useState(null)
  const users = useSelector((state) => state.user)
 const {currentUser,loading, error} = users
  const handleChange = (e) => {
setFormData({...formData , [e.target.name]:e.target.value})
  }
console.log("currentUser", currentUser)
console.log("err", error)
  const handleSubmit = async(e) => {
e.preventDefault()
const {username, email, password} = formData
if(!username || !email || !password){
  return
}
dispatch(fetchRegister({username,email,password,pic}))
  }
  console.log("object", pic)
  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          name='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          name='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          name='password'
          onChange={handleChange}
        />
  <input
          type='file'
          name='photo'
          className='border p-3 rounded-lg'
          onChange={(e) => setPic(e.target.files[0])}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    </>
  )
}

export default Signup
