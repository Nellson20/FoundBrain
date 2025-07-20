import { useState,useLayoutEffect } from "react"
import axios from "axios"
export const useReq = (opts,dependancies=[]) => {
    const [data, setData] = useState([])
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        setLoading(true)
        axios(opts).then((res) => {
            setData(res.data)
            setLoading(false)

        }).catch((err) => {
            setErr(err)

        })
    }, dependancies)

    return { data, err, loading }


}