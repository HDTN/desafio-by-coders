import GoogleButton from 'react-google-button'
import { useUserContext } from '../../../contexts/user'
import { useNavigate } from 'react-router-dom'
import './style.css'
import AuthService from '../../../services/auth'

export default function Login(){
    const navigate = useNavigate()
    const { setUser } = useUserContext()

    const handleFetchUser = async () => {
        AuthService.selectUserInReq({})
            .then(result => setUser(result.user))
            .then(() => navigate('/'))
    }

    const handleClick = async () => {
        let timer = null
        const newWindow = window.open("http://localhost:3333/api/auth/google/login", "_blank", "width=500, height=600")

        if(newWindow){
            timer = setInterval(() => {
                if(newWindow.closed){
                    handleFetchUser()
                    if(timer) clearInterval(timer)
                }
            }, 500)
        }

    }
    return <><div className="login_container">
        <div className="login_wrapper">
            <form className="login_form">
                <div className="login_action">
                    <span>
                        <h1>desafio By coders</h1>
                        <h3>Faça seu login.</h3>
                    </span>
                    <GoogleButton 
                        data-cy="btn-login" 
                        style={{background: '#171616'}} 
                        onClick={handleClick}/>
                </div>
                <div className="login_logo">
                    <img src="/logo-coders.png" alt='logo empresa By Coders'/>
                </div>
            </form>
        </div>
    </div></>
}

