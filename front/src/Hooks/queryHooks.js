import { useQueryClient } from "@tanstack/react-query"
import { chunckArray, flatInfiniteQuery } from "../functions"

export const usePaginated = ({ queryKey, ipp = 5 }) => {

    const queryClient = useQueryClient()

    const addItem = (item) => {
        const newData = flatInfiniteQuery()
        queryClient.setQueryData(queryKey, (old) => {
            const oldArray = flatInfiniteQuery(old)
            return {
                ...old,
                pages: chunckArray([item, ...oldArray], ipp).map((data, i) => ({
                    data,
                    nextPage: i + 2,
                    totalItems: oldArray.length + 1
                }))
            }
        })
    }
    const deleteItem = (itemId) => {
        queryClient.setQueryData(queryKey, (old) => {
            const newArray = flatInfiniteQuery(old).filter((item) => item.id !== itemId)
            return {
                ...old,
                pages: chunckArray([...newArray], ipp).map((data, i) => ({
                    data,
                    nextPage: i + 2,
                    totalItems: old.pages[0]?.data?.totalItems - 1
                }))
            }
        })
    }
    const editItem = (itemId, newValues=(item)=>item) => {
        queryClient.setQueryData(queryKey, (old) => {
            const newArray = flatInfiniteQuery(old).map((item) => item.id === itemId ? { ...item, ...newValues(item) } : item)
            return {
                ...old,
                pages: chunckArray([...newArray], ipp).map((data, i) => ({
                    data,
                    nextPage: i + 2,
                    totalItems: old.pages[0].data.totalItems + 1
                }))
            }
        })
    }

    return { addItem, deleteItem, editItem }
}