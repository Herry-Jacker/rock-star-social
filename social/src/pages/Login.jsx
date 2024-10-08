import { Box, Typography, OutlinedInput, Button, Alert, } from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

async function postLogin(data) {
    const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!res.ok) {
        throw new Error(await res.json());
    }

    return res.json();
}

export default function Login() {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [ error, setError ] = useState();

    const { setAuth, setAuthUser } = useApp();

    const login = useMutation( postLogin, {
        onSuccess: ({ token, user }) => {
            localStorage.setItem("token", token);
            setAuth(true);
            setAuthUser(user);
            navigate("/");
        }
    })

    return <Box>
        <Typography variant="h3" sx={{ mb: 4 }}>Login</Typography>
        
        { error && (
            <Alert
                severity="warning"
                sx={{ mb: 4 }}>
                {error}
            </Alert>
        )}

        <form
            onSubmit={ e => {
                e.preventDefault();

                const username = usernameRef.current.value;
                const password = passwordRef.current.value;

                if( !username || !password ) {
                    return setError("require username and password");
                }

                login.mutate({username, password});

                e.currentTarget.reset();
            }}
        >
            <OutlinedInput inputRef={usernameRef} sx={{ mb: 2 }} fullWidth placeholder="Username" />
            <OutlinedInput inputRef={passwordRef} sx={{ mb: 2 }} fullWidth placeholder="Password" type="password" />

            <Button variant="contained" type="submit" fullWidth>Login</Button>
        </form>
    </Box>
}
