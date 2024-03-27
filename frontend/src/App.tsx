import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";

type AppUser = {
    id: string,
    username: string,
    email: string,
    avatarUrl: string,
    role: "ADMIN" | "USER"
}

function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function fetchMe() {
        setIsLoading(true);
        axios.get("/api/users/me")
            .then((response) => setAppUser(response.data))
            .catch(() => setAppUser(null))
            .finally(() => setIsLoading(false));
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setAppUser(null);
                fetchMe();
            })
            .catch(() => console.error("Failed to logout"))
    }

    useEffect(() => {
        fetchMe();
    }, []);

    if (isLoading && appUser === undefined) {
        return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={(
                    <>
                        <div>{appUser ? `Welcome back, ${appUser.username}` : "Welcome!"}</div>
                        {appUser ? <button onClick={logout}>Logout</button> : (<><Link to={"/login"}>Login</Link><br/><Link to={"/register"}>Register</Link></>)}
                    </>
                )}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/login"} element={<LoginPage fetchMe={fetchMe}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
