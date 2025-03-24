import { useEffect, useState } from "react"
import API from "../api/Wapizima";

export const useMaintainment = () => {
  const [maintainment, setMaintainment] = useState()
  const getMaintainment = async () => {
    const { data } = await API.get('/administrable/maintainment');
    setMaintainment(data.maintainment)
  }
  useEffect(() => {
    getMaintainment();
  },[])
  return {
    maintainment
  }
}