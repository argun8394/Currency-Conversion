import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-w-full pageH">
      <div className="flex flex-col items-center gap-8 py-4 px-8 w-max ">
        <h1 className="font-bold text-[#120a2e]">Well Come to CC APP</h1>
        <button onClick={() => navigate("/register")} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Click for Register</button>
      </div>
    </div>
  )
}

export default Home