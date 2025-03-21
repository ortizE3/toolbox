import { useAuth0 } from "@auth0/auth0-react";
import './Header.css'
import { useEffect, useState } from "react";
function Header() {
    const { user, isAuthenticated, logout } = useAuth0();
    const [profileIcon, setProfileIcon] = useState<string>('');
    useEffect(() => {
        if (user && user.picture) {
            setProfileIcon(user.picture)
        }
    }, [user])

    return (
        <div className="header-container">
            <h1 className="header-title">TOOLBOX</h1>

            {isAuthenticated && user &&
                <div className="header-user-container ">
                    {profileIcon && <img className="header-icon" src={profileIcon} alt={user.name} />}
                    <button onClick={() => logout({ logoutParams: { returnTo: import.meta.env.VITE_REACT_LOGOUT_REDIRECT } })}>
                        Log Out
                    </button>
                </div>
            }
        </div>
    )
}

export default Header