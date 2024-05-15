import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDatabase } from "../../contexts/Database"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput"

import { Link } from "react-router-dom"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"

import "./Register.css"
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"

const Register = () => {

    const navigate = useNavigate();

    const { currentUser, register } = useDatabase();

    const [searchParams] = useSearchParams();
    const redirectParam = searchParams.get("redirect")

    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [username, handleUsernameChange, setUsernameError] = useInput({});
    const [email, handleEmailChange, setEmailError] = useInput({});
    const [password, handlePasswordChange, setPasswordError] = useInput({});
    const [confirmPassword, handleConfirmPasswordChange, setConfirmPasswordError] = useInput({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setUsernameError()
        setEmailError()
        setPasswordError()
        setConfirmPasswordError()

        let shouldReturn = false;

        if (!username.value.length) {
            shouldReturn = true;
            setUsernameError(true, "Can't be empty")
        }

        if (!email.value.length) {
            shouldReturn = true;
            setEmailError(true, "Can't be empty")
        }

        if (!password.value.length) {
            shouldReturn = true;
            setPasswordError(true, "Can't be empty")
        }

        if (!confirmPassword.value.length) {
            shouldReturn = true;
            setConfirmPasswordError(true, "Can't be empty")
        }

        if (shouldReturn) return

        if (confirmPassword.value != password.value) {
            setConfirmPasswordError(true, "Doesn't match")
            return setError("Passwords don't match");
        }

        try {
            setLoading(true);
            await register(username.value, email.value, password.value);
            if (!redirectParam)
                navigate("/")
            else navigate(`/${redirectParam}`)

        } catch {
            return setError("Failed to register.")
        }

        setLoading(false)
    }

    if (!currentUser)
        return <main className="register-page__main">
            <section className="register-page__form-container">
                <FormComponent
                    onSubmit={handleSubmit}
                    title="Register"
                    isError={typeof error == "string"}
                    errorMessage={typeof error == "string" ? error : undefined}
                >
                    <div className="register-page__form__group">
                        <div className="register-page__form__input-container">
                            <Input
                                value={username.value}
                                placeholder="Your username"
                                onChange={handleUsernameChange}
                                isError={username.isError}
                                errorMessage={username.errorMessage}
                            >
                                Username
                            </Input>
                        </div>
                        <div className="register-page__form__input-container">
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
                        <div className="register-page__form__input-container">
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
                        <div className="register-page__form__input-container">
                            <Input
                                value={confirmPassword.value}
                                placeholder="Confirm Password"
                                onChange={handleConfirmPasswordChange}
                                isError={confirmPassword.isError}
                                errorMessage={confirmPassword.errorMessage}
                                isPassword={true}
                            >
                                Confirm Password
                            </Input>
                        </div>
                        <div className="register-page__form__submit-container">
                            <Button
                                role="submit"
                                type="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                Register
                            </Button>
                        </div>
                        <div className="register__link">
                            <Link className="link" to="/log-in">
                                Already have an account? Log in!
                            </Link>
                        </div>
                    </div>
                </FormComponent>
            </section>
        </main>
    else return <ErrorComponent />
}

export default Register
