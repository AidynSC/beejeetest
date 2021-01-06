import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', body = null, param = '', headers = {}) => {
        try {
            if (body) {
                const formData = new FormData()
                for (const key in body) {
                    if (body.hasOwnProperty(key)) {
                        formData.append(key, body[key])
                    }
                }
                body = formData
            }

            const response = await fetch(`https://uxcandy.com/~shapoval/test-task-backend/v2/${url}?developer=aidyn${param}`, { method, body, headers })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data
        } catch (e) {
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { request, error, clearError }
}