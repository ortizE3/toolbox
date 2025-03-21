import { useAuth0 } from "@auth0/auth0-react";

function Login() {
    const { loginWithRedirect } = useAuth0();
    const { user, isAuthenticated } = useAuth0();

    return (
        <div>
            <div>
                <button onClick={() => loginWithRedirect()}>Login</button>
            </div>
            {isAuthenticated && user && (
                <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            )}
        </div>

    )
}

export default Login