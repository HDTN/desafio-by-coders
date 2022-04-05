import { useEffect } from "react"

export default function LoginSuccess(){
    useEffect(() => {
        return setTimeout(() => window.close(), 2000)
    }, [])
    return <>Thank you for login</>
}