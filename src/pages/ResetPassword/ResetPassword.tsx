import type {FormEvent} from "react";

import { useState } from "react";
import { useStorageInput } from "../../hooks/useInput/hooks/useInput/useStorageInput";

import { Link } from "react-router-dom";
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import * as validation from "../../utils/validations"

import "./ResetPassword.css"
import { useDatabase } from "../../contexts/Database";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const ResetPassword = () => {

    const {currentUser, resetPassword} = useDatabase()

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean | string>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const [email, handleEmailChange, setEmailError] = useStorageInput({key: "reset-password-email"});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(false);
        setEmailError();
        setError(false);

        if(validation.validateEmail(email.value))
            return setEmailError(true, "Invalid Email")
        try{
            setLoading(true);
            await resetPassword(email.value)
            setSuccess(true);
        }catch(error){
            console.error(error)
            setError("Failed to reset password.")
        }
        setLoading(false);
    }

    if(currentUser)
        return <ErrorComponent />

    if(!success)
    return <main className="reset-password__main">
        <section className="reset-password__form">
            <FormComponent
                title="Reset Password"
                onSubmit={handleSubmit}
                isError={typeof error == "string"}
                errorMessage={typeof error == "string" ? error : undefined}
            >
                <div className="form__input-container">
                    <Input
                        placeholder="Your Email Address"
                        value={email.value}
                        onChange={handleEmailChange}
                        isError={email.isError}
                        errorMessage={email.errorMessage}
                    >
                        Email
                    </Input>
                </div>
                <div className="form__submit-container-2">
                    <Button
                        type="primary"
                        role="submit"
                        loading={loading}
                        disabled={loading}
                    >
                        Send Message
                    </Button>
                </div>
            </FormComponent>
        </section>
    </main>
    else
    return <main className="reset-password__main">
        <section className="reset-password__success-box">
            <header className="reset-password__header">
                <h1 className="reset-password__heading">
                    Message sent!
                </h1>
            </header>
            <span className="reset-password__the-email">
                {email.value}
            </span>
            <p className="reset-password__information">
                A password reset form has been sent to your address. If you don't see any message, you should check the spam folder. You can also change the email you provided.
            </p>
            <div className="reset-password__links">

            </div>
            <Link className="link" to="/log-in">
                Go back to Log In page
            </Link>
            <button 
                className="btn btn--link-like link"
                onClick={() => setSuccess(false)}
            >
                Change Email
            </button>
        </section>
    </main>
}

export default ResetPassword
