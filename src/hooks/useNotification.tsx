import { useContext, useEffect, useState } from "react"
import API from "../api/Wapizima";
import { AuthContext } from "../context/Auth/AuthContext";

export const useNotification = () => {
    const { status} = useContext(AuthContext);
  const sendToken = async (token: string, url: string) => {
 
    const { data } = await API.post(url, {tokenDevice: token});
    console.log(data);
    
  }
  return {
    sendToken
  }
}