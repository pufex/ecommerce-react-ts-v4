import { useState } from "react"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDatabase } from "../../contexts/Database"

import { Link } from "react-router-dom"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"

import * as validation from "../../utils/validations"

import "./Login.css"
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"

const Login = () => {
    
    const navigate = useNavigate();

    const {currentUser, login} = useDatabase();

    const [searchParams] = useSearchParams();
    const redirectParam = searchParams.get("redirect")

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [email, handleEmailChange, setEmailError] = useInput({});
    const [password, handlePasswordChange, setPasswordError] = useInput({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setEmailError();
        setPasswordError();

        let shouldReturn = false;

        if(!password.value.length){
            shouldReturn = true;
            setPasswordError(true, "Can't be empty")
        }

        if(validation.validateEmail(email.value)){
            shouldReturn = true;
            setEmailError(true, "Invalid email")
        }

        if(shouldReturn) return

        try{
            setLoading(true);
            await login(email.value, password.value);
            if(redirectParam === "true")
                navigate(-1)
            else navigate("/")

        }catch{
            return setError("Failed to log in.")
        }

        setLoading(false)

    }

    
    if(!currentUser)
    return <main className="login-page__main">
        <section className="login-page__form-container">
            <FormComponent
                onSubmit={handleSubmit}
                title="Log In"
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >   
                <div className="login-page__form__group">
                    <div className="login-page__form__input-container">
                        <Input
                            value={email.value}
                            placeholder="Your email"
                            onChange={handleEmailChange}
                            isError={email.isError}
                            errorMessage={email.errorMessage}
                        >
                            Email
                        </Input>
                    </div>
                    <div className="login-page__form__input-container">
                        <Input
                            value={password.value}
                            placeholder="Your password"
                            onChange={handlePasswordChange}
                            isError={password.isError}
                            errorMessage={password.errorMessage}
                            isPassword={true}
                        >
                            Password
                        </Input>
                    </div>
                </div>
                <div className="login-page__form__submit-container">
                    <Button
                        type="primary"
                        role="submit"
                        disabled={loading}
                        loading={loading}
                    >
                        Log In
                    </Button>
                </div>
                <div className="login-page__links">
                    <Link className="link" to="/register" >
                        Don't have an account? Register now!
                    </Link>
                    <Link className="link" to="/reset-password">
                        Forgot password?
                    </Link>
                </div>
            </FormComponent>
        </section>
    </main>
    else return <ErrorComponent />
}

export default Login
