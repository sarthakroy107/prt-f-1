"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner"
import {VscError, VscCheck} from 'react-icons/vsc'

const UsernameCheck = ({username}: {username: string}) => {
  console.log(username)
  const [currentState, setCurrentState] = useState<boolean | null>(null);
  const [loading, setLoadiing] = useState<boolean>(false)

  useEffect(()=> {
    setCurrentState(null)
  }, [username])

  const handleAvailibilityCheck = async (e: any) => {
    e.preventDefault();
    setLoadiing(true)

    const res = await axios({
      method:"put",
      url: "http://localhost:8000/api/v1/username-availibility",
      data:{
        username: username
      }
    })
    setCurrentState(res.data.data)
    console.log(res.data.data)
    setLoadiing(false)
  }

  if(loading) {
    return (
      <div className="border border-white/50 bg-slate-100/5 backdrop-blur-md rounded-md p-2 px-7">
        <TailSpin
          height="22"
          width="22"
          color="#9023D3"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }

  return (
    <button className={`border border-white p-2 px-3 rounded-md`}
    onClick={handleAvailibilityCheck}>
      {
        currentState === null ? "Check" : currentState === true ? (<VscCheck className="text-xl mx-2 text-green-500"/>) 
        : (<VscError className="text-xl mx-2 text-red-800"/>)
      }
    </button>
  )
}

export default UsernameCheck