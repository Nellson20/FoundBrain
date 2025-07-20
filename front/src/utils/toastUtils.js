import { toast } from "react-toastify"
import { X } from "react-bootstrap-icons"
import Toast from "../components/Toast/Toast"

export const showToast=({content='Success',type=null})=>{
    const toastType = type ? toast[type] : toast
    return toastType(({ data,closeToast }) => {
        return <Toast content={data.content} type={type} closeToast={closeToast}/>
    }, {
        autoClose: 5000,
        data: {
            content,
        
        },
    
    })
}