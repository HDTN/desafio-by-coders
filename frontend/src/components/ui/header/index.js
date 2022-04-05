import { useUserContext } from '../../../contexts/user'
import { RiLogoutBoxLine } from 'react-icons/ri'
import './style.css'
export default function Header(){
    const { logout } = useUserContext()
    return <div className="header-container">
        <div className="header-wrapper">
            <div className="header-logo">
                <img src="logo-coders.png" alt="logo empresa By Coders"/>
            </div>
            <div className="header-actions">
                <button type='button' onClick={() => logout()}>
                    <RiLogoutBoxLine fontSize={32} color="004699"/>
                </button>
            </div>
        </div>
    </div>
}
