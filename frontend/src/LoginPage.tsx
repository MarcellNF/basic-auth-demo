import axios from "axios";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    fetchMe: () => void;
}

export default function LoginPage(props: Readonly<LoginPageProps>) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function login() {
        axios.post("/api/users/login", {}, {
            auth: {
                username: username,
                password: password
            }
        }).then(() => {
            console.log("Welcome back!")
            navigate("/");
            props.fetchMe();
        }).catch(() => {
            console.error("Invalid credentials")
        })
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        login();
    }

    console.log(username + " " + password);

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} type={"password"}/>
            <button>Login</button>
        </form>
    );
}