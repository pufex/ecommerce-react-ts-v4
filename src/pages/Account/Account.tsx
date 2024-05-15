import type { FormEvent } from "react"

import { useIconsContext } from "../../contexts/Icon"
import { useState, useRef } from "react"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput"
import { useDatabase } from "../../contexts/Database"

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"

import * as validation from "../../utils/validations"

import "./Account.css"

const Account = () => {

    const {
        currentUser,
        currentDocument,
        changeUsername,
        updateCredentials
    } = useDatabase();
    const { FaEdit } = useIconsContext();

    const [loading, setLoading] = useState<boolean>(false);
    // @ts-expect-error
    const [error, setError] = useState<boolean | string>(false);

    const [username, handleUsernameChange, setUsernameError] = useInput({})
    const [displayUsername, setDisplayUsername] = useState<boolean>(false);
    const switchUsernameDisplay = () => setDisplayUsername(previous => !previous)

    const [email, handleEmailChange, setEmailError] = useInput({})
    const [displayEmail, setDisplayEmail] = useState<boolean>(false);
    const switchEmailDisplay = () => setDisplayEmail(previous => !previous)

    const oldName = useRef(currentDocument?.credentials?.name);
    const oldSurname = useRef(currentDocument?.credentials?.surname);
    const oldLocation = useRef(currentDocument?.credentials?.location);
    const oldPostalCode = useRef(currentDocument?.credentials?.postalCode);
    const oldAddress = useRef(currentDocument?.credentials?.address);
    const oldEmailCred = useRef(currentDocument?.credentials?.email);

    const [name, handleNameChange, setNameError] = useInput({defaultValue: currentDocument?.credentials?.name ?? ""})
    const [surname, handleSurnameChange, setSurnameError] = useInput({defaultValue: currentDocument?.credentials?.surname ?? ""})
    const [location, handleLocationChange, setLocationError] = useInput({defaultValue: currentDocument?.credentials?.location ?? ""})
    const [postalCode, handlePostalCodeChange, setPostalCodeError] = useInput({defaultValue: currentDocument?.credentials?.postalCode ?? ""})
    const [address, handleAddressChange, setAddressError] = useInput({defaultValue: currentDocument?.credentials?.address ?? ""})
    const [emailCred, handleEmailCredChange, setEmailCredError] = useInput({defaultValue: currentDocument?.credentials?.email ?? ""})
    const [phone, handlePhoneChange, setPhoneError] = useInput({defaultValue: currentDocument?.credentials?.phone ?? ""})

    const handleUsernameSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameError()

        const button = e.currentTarget;
        button.classList.add("busy");

        if (!username.value.length)
            return setUsernameError(true, "Invalid username");
        try {
            setLoading(true);
            await changeUsername(username.value);
        } catch (error) {
            setError("Failed to change username.")
        }
        button.classList.remove("busy");
        setLoading(false);


    }

    const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameError();
        setEmailError();

        const button = e.currentTarget;
        button.classList.add("busy");

        if (validation.validateEmail(email.value))
            return setUsernameError(true, "Invalid username");
        try {
            setLoading(true);
            await changeUsername(username.value);
        } catch (error) {
            setError("Failed to change username.")
        }

        button.classList.remove("busy");
        setLoading(false);

    }

    const handleCredentialsSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameError()
        setSurnameError()
        setLocationError()
        setPostalCodeError()
        setAddressError()
        setEmailCredError()
        setError(false)

        let shouldReturn = false;

        if (validation.validateNameLike(name.value) && name.value.length) {
            shouldReturn = true;
            setNameError(true, "Invalid Name")
        }

        if (validation.validateNameLike(surname.value, { emptyOk: true })) {
            shouldReturn = true;
            setSurnameError(true, "Invalid Surname")
        }

        if (validation.validateNameLike(location.value, { emptyOk: true })) {
            shouldReturn = true;
            setLocationError(true, "Invalid Location")
        }


        if (validation.validateCode(postalCode.value, { emptyOk: true })[0]) {
            shouldReturn = true;
            setPostalCodeError(true, "Invalid Location")
        }

        if (validation.validateEmail(emailCred.value, { emptyOk: true })) {
            shouldReturn = true;
            setEmailCredError(true, "Invalid Email")
        }

        const [phoneInvalid, phoneError] = validation.validatePhone(phone.value, {emptyOk: true}) 
        if(phoneInvalid){
            shouldReturn = true;
            setPhoneError(true, phoneError);
        }
        
        
        if (shouldReturn) return;

        try {
            setLoading(true);
            await updateCredentials(
                name.value, 
                surname.value, 
                emailCred.value, 
                location.value, 
                address.value, 
                postalCode.value,
                phone.value,
            );
            oldName.current = name.value
            oldSurname.current = surname.value
            oldEmailCred.current = emailCred.value
            oldLocation.current = location.value
            oldPostalCode.current = postalCode.value
            oldAddress.current = address.value
        } catch (error) {
            console.error(error)
            setError("Failed to update your credentials.")
        }
        setLoading(false);
    }

    if(currentUser)
    return <main className="account__main">
        <header className="account__header">
            <h1 className="account__heading">
                Your Account
            </h1>
        </header>
        <section className="account__settings-cards">
            <section className="account__settings-section">
                <h1 className="account__settings-heading">
                    Your account's info
                </h1>
                <section className="account__settings">

                    {
                        !displayUsername
                            ? <div className="account__setting">
                                <div className="account__setting-property">
                                    <span className="account__setting-key">
                                        Username: 
                                    </span>
                                    <span className="account__setting-value">
                                        {currentDocument?.username}
                                    </span>
                                </div>
                                <button
                                    className="btn account__setting-edit"
                                    onClick={switchUsernameDisplay}
                                >
                                    <FaEdit
                                        className="account__setting-edit-icon"
                                        size={30}
                                    />
                                </button>
                            </div>
                            : <FormComponent
                                onSubmit={handleUsernameSubmit}
                            >
                                <div className="form__input-and-2-buttons">
                                    <Input
                                        placeholder="New Username"
                                        value={username.value}
                                        onChange={handleUsernameChange}
                                        isError={username.isError}
                                        errorMessage={username.errorMessage}
                                    >
                                        New Username
                                    </Input>
                                    <Button
                                        role="submit"
                                        type="primary"
                                        loading={false}
                                        disabled={loading}
                                    >
                                        Change
                                    </Button>
                                    <Button
                                        role="button"
                                        type="primary"
                                        onClick={switchUsernameDisplay}
                                    >
                                        Discard
                                    </Button>
                                </div>
                            </FormComponent>
                    }
                    {
                        !displayEmail
                            ? <div className="account__setting">
                                <div className="account__setting-property">
                                    <span className="account__setting-key">
                                        Email: 
                                    </span>
                                    <span className="account__setting-value">
                                        {currentDocument?.email}
                                    </span>
                                </div>
                                <button
                                    className="btn account__setting-edit"
                                    onClick={switchEmailDisplay}
                                >
                                    <FaEdit
                                        className="account__setting-edit-icon"
                                        size={30}
                                    />
                                </button>
                            </div>
                            : <FormComponent
                                onSubmit={handleEmailSubmit}
                            >
                                <div className="form__input-and-2-buttons">
                                    <Input
                                        placeholder="New Email"
                                        value={email.value}
                                        onChange={handleEmailChange}
                                        isError={email.isError}
                                        errorMessage={email.errorMessage}
                                    >
                                        New Email
                                    </Input>
                                    <Button
                                        role="submit"
                                        type="primary"
                                        loading={false}
                                        disabled={loading}
                                    >
                                        Change
                                    </Button>
                                    <Button
                                        role="button"
                                        type="primary"
                                        onClick={switchEmailDisplay}
                                    >
                                        Discard
                                    </Button>
                                </div>
                            </FormComponent>
                    }
                </section>
            </section>
            <section className="account__settings-section">
                <h1 className="account__settings-heading">
                    Your Credentials
                </h1>
                <FormComponent
                    onSubmit={handleCredentialsSubmit}
                >
                    <div className="form__double-input">
                        <Input
                            placeholder="Your Name"
                            value={name.value}
                            onChange={handleNameChange}
                            isError={name.isError}
                            errorMessage={name.errorMessage}
                        >
                            Name
                        </Input>
                        <Input
                            placeholder="Your Surname"
                            value={surname.value}
                            onChange={handleSurnameChange}
                            isError={surname.isError}
                            errorMessage={surname.errorMessage}
                        >
                            Surname
                        </Input>
                    </div>
                    <div className="form__input-container">
                        <Input
                            placeholder="Your Email Address"
                            value={emailCred.value}
                            onChange={handleEmailCredChange}
                            isError={emailCred.isError}
                            errorMessage={emailCred.errorMessage}
                        >
                            Email
                        </Input>
                    </div>
                    <div className="form__double-input">
                        <Input
                            placeholder="Your Location"
                            value={location.value}
                            onChange={handleLocationChange}
                            isError={location.isError}
                            errorMessage={location.errorMessage}
                        >
                            City
                        </Input>
                        <Input
                            placeholder="Postal Code"
                            value={postalCode.value}
                            onChange={handlePostalCodeChange}
                            isError={postalCode.isError}
                            errorMessage={postalCode.errorMessage}
                        >
                            Postal Code
                        </Input>
                    </div>
                    <div className="form__input-container">
                        <Input
                            placeholder="Your Address"
                            value={address.value}
                            onChange={handleAddressChange}
                            isError={address.isError}
                            errorMessage={address.errorMessage}
                        >
                            Address
                        </Input>
                    </div>
                    <div className="form__input-container">
                        <Input
                            placeholder="Your Phone Number"
                            value={phone.value}
                            onChange={handlePhoneChange}
                            isError={phone.isError}
                            errorMessage={phone.errorMessage}
                        >
                            Phone Number
                        </Input>
                    </div>
                    <div className="form__submit-container">
                        <Button
                            role="submit"
                            type="primary"
                            loading={false}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </div>
                </FormComponent>
            </section>
        </section>
    </main>
    else return <ErrorComponent />
}

export default Account
