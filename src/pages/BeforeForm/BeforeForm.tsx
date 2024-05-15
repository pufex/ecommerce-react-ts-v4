import { useMemo, useRef, useState, type FormEvent } from "react"

import { useNavigate, useSearchParams } from "react-router-dom"
import { useStorageInput } from "../../hooks/useInput/hooks/useInput/useStorageInput"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput"
import { useDatabase } from "../../contexts/Database"

import { Link } from "react-router-dom"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"

import { validateEmail } from "../../utils/validations"

import ManAndWoman from "../../assets/images/man-and-woman-in-shop.jpg"
import "./BeforeForm.css"

const BeforeForm = () => {

    const navigate = useNavigate();

    const {currentUser, login, partners} = useDatabase();
    
    const [params] = useSearchParams();
    const partnerId = params.get("partner")
    
    const [error, setError] = useState<boolean | string>(false)
    const [loading, setLoading] = useState<boolean>(false)
    
    const [email, handleEmailChange, setEmailError] = useStorageInput({key: "before-form-email"});
    const [password, handlePasswordChange, setPasswordError] = useInput({});

    const isPartnerThere = useRef<boolean>(true)
    const partner = useMemo(() => {
        const foundPartner = partners
            ?.find(({id}) => id == partnerId)
        if(!foundPartner)
            isPartnerThere.current = false;
        return foundPartner;
    }, [partnerId])
    if(!partnerId) return <ErrorComponent />
    if(!isPartnerThere.current) return <ErrorComponent />

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError()
        setPasswordError()

        let shouldReturn = false;
        if(validateEmail(email.value)){
            shouldReturn = true;
            setEmailError(true, "Invalid Email")
        }

        if(password.value.length < 6){
            shouldReturn = true;
            setPasswordError(true, "Min. 6 characters")
        }
        if(shouldReturn) return;

        try{
            setLoading(true);
            await login(email.value, password.value);
            navigate(`/pay-form?partner=${partner?.id}`)
        }catch(error){
            console.error(error)
            setError("Failed to log in.")
        }
        setLoading(false);

    }

    if(currentUser) navigate(-1)

    return <main className="before-form__main">
        <section className="before-form__card">
            <section className="before-form__card--left">
                <header className="before-form__header">
                    <h1 className="before-form__heading">
                        Before you pay...
                    </h1>
                </header>
                <p className="before-form__information">
                    You should login to your account!
                </p>
                <div className="before-form__login-form">
                    <FormComponent
                        onSubmit={handleLogin}
                        isError={typeof error == 'string'}
                        errorMessage={typeof error == "string" ? error : undefined}
                    >
                        <div className="form__input-container">
                            <Input
                                placeholder="Your Email Address"
                                value={email.value}
                                isError={email.isError}
                                errorMessage={email.errorMessage}
                                onChange={handleEmailChange}
                            >   
                                Email
                            </Input>
                        </div>
                        <div className="form__input-container">
                            <Input
                                placeholder="Your Email Address"
                                value={password.value}
                                isError={password.isError}
                                errorMessage={password.errorMessage}
                                onChange={handlePasswordChange}
                                isPassword={true}
                            >   
                                Password
                            </Input>
                        </div>
                        <div className="form__submit-container-2">
                            <Button
                                role="submit"
                                type="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                Log in
                            </Button>
                        </div>
                    </FormComponent>
                </div>
                <div className="before-form__options">
                    <Link className="link" to={"/register?redirect=true"}>
                        Not signed up? Create an account.
                    </Link>
                    <Link className="link" to={"/pay-form"}>
                        Pay without an account.
                    </Link>
                </div>
            </section>
            <section className="before-form__card--right">
                <img 
                    src={ManAndWoman} 
                    alt={""} 
                    className="before-form__image"
                />
            </section>  
        </section>
    </main>
}

export default BeforeForm
