import { useState, useEffect } from "react"
const useApiRequest = (url, options) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try{
                setsLoading(true)
                setError(null)
                const response = await fetch(url, options)
                if (!response.ok){
                    const message = `An error has occured : ${response.statusText}`
                    throw Error(message)
                }else{
                    const data = await response.json()
                    setData(data)
                    setLoading(false)
                }
            }catch (error){
                setIsLoading(false);
                setError(error.message);
            }
        }
        fetchData()
    }, [url])

   
    return {error, isLoading, data}

}

export default useApiRequest