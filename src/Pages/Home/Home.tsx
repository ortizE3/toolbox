import { useEffect } from "react"
import Projects from "../../Components/Projects/Projects"
import { useAuth0 } from "@auth0/auth0-react";
import { CreateUser, GetUser } from "../../Components/services/UserService.ts/UserService";
import { CreateUserRequest } from "../../Models/User/CreateUserRequest";

function Home() {
    const { user } = useAuth0();
    useEffect(() => {
        if (user && user.sub) {
            GetUser(user.sub).catch(() => {
                if (user &&
                    user.sub &&
                    user.email &&
                    user.name) {
                    let request: CreateUserRequest = {
                        id: user.sub,
                        email: user.email,
                        name: user.name
                    }
                    CreateUser(request).catch((err) => {
                        console.error('User could not be created', err)
                    });
                }
            });
        }
    }, [user])

    return (
        <Projects />
    )
}

export default Home