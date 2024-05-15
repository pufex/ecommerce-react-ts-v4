import type { OrderType } from "../../contexts/Database";

import { useState, useRef, useMemo, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useCart } from "../../hooks/useCart"
import { useDatabase } from "../../contexts/Database"
import { useInput } from "../../hooks/useInput/hooks/useInput/useInput"

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent"
import FormComponent from "../../components/FormComponent/FormComponent"
import Input from "../../components/Input/Input"
import Radio from "../../components/Radio/Radio"
import DropdownWithContent from "../../components/DropdownWithContent/DropdownWithContent"
import PayFormProduct from "./components/PayFormProduct/PayFormProduct"
import Button from "../../components/Button/Button"
import Checkbox from "../../components/Checkbox/Checkbox"

import * as valid from "../../utils/validations"

import { calculateProvision } from "../../utils/calculateProvision"
import "./PayForm.css"

type PaymentMethods =
    "unset" |
    "cod" |
    "credit-card"

const PayForm = () => {

    let navigate = useNavigate();
    
    const {currentUser, currentDocument, partners, pushOrder, updateCredentials} = useDatabase();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<boolean | string>(false);

    useEffect(() => {
        if(error)
            console.error(error)
    }, [error])

    const [firstDropDisplay, setFirstDropDisplay] = useState<boolean>(true)
    const switchFirstDisplay = () => {
        setFirstDropDisplay(previous => !previous)
    }
    const [secondDropDisplay, setSecondDropDisplay] = useState<boolean>(false)
    const switchSecondDisplay = () => {
        setSecondDropDisplay(previous => !previous)
    }
    const [thirdDropDisplay, setThirdDropDisplay] = useState<boolean>(false)
    const switchThirdDisplay = () => {
        setThirdDropDisplay(previous => !previous)
    }

    const firstDropRef = useRef<HTMLDivElement | null>(null);
    const secondDropRef = useRef<HTMLDivElement | null>(null);

    const [saveCreds, setSaveCreds] = useState(false);
    const switchSaveCreds = () => setSaveCreds(previous => !previous)

    const [name, handleNameChange, setNameError] = useInput({defaultValue: currentDocument?.credentials.name ?? ""})
    const [surname, handleSurnameChange, setSurnameError] = useInput({defaultValue: currentDocument?.credentials.surname ?? ""})
    const [address, handleAddressChange, setAddressError] = useInput({defaultValue: currentDocument?.credentials.address ?? ""})
    const [postCode, handleCodeChange, setCodeError] = useInput({defaultValue: currentDocument?.credentials.postalCode ?? ""})
    const [city, handleCityChange, setCityError] = useInput({defaultValue: currentDocument?.credentials.location ?? ""})
    const [email, handleEmailChange, setEmailError] = useInput({defaultValue: currentDocument?.credentials.email ?? ""})
    const [phone, handlePhoneChange, setPhoneError] = useInput({defaultValue: currentDocument?.credentials.email ?? ""})

    const [cardNumber, handleCardNumberChange, setCardNumberError] = useInput({})
    const [fullname, handleFullnameChange, setFullnameError] = useInput({})
    const [cvv, handleCVVChange, setCVVError] = useInput({})
    const [cardEmail, handleCardEmailChange, setCardEmailError] = useInput({})

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("unset");

    const [searchParams] = useSearchParams();
    const partnerId = searchParams.get("partner")!
    const isPartnerThere = useRef<boolean>(true);
    const partner = useMemo(() => {
        const foundPartner = partners
            ?.find(({id}) => id === partnerId)
        if(!foundPartner)
            isPartnerThere.current = false;
        return foundPartner
    }, [partners])
    if(!isPartnerThere.current) return <ErrorComponent />
    
    const { cart, clearCart } = useCart(partnerId);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameError()
        setSurnameError()
        setAddressError()
        setCodeError()
        setCityError()
        setEmailError()
        setPhoneError()
        setCardNumberError()
        setFullnameError()
        setFullnameError()
        setCardEmailError()

        let shouldReturn = false;
        let navigateTo = 0

        if(valid.validateNameLike(name.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setNameError(true, "Invalid name")
        }
        if(valid.validateNameLike(surname.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setNameError(true, "Invalid surname")
        }
        if(valid.validateAddress(address.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setAddressError(true, "Invalid address")
        }
        if(valid.validateCode(postCode.value)[1]){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setCodeError(true, "Invalid code")
        }
        if(valid.validateNameLike(city.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setCityError(true, "Invalid city")
        }
        if(valid.validateEmail(email.value)){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setEmailError(true, "Invalid email")
        }
        const [phoneInvalid, phoneError] = valid.validatePhone(phone.value)
        if(phoneInvalid){
            shouldReturn = true;
            if(navigateTo == 0)
                navigateTo = 1;
            setPhoneError(true, phoneError)
        }
        if(paymentMethod == "credit-card"){
            const [cardNumberMessage, cardNumberError] = valid.validateCreditCardNumber(cardNumber.value)
            if(cardNumberError){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCardNumberError(true, cardNumberMessage)
            }
            if(valid.validateFullname(fullname.value)){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setFullnameError(true, "Invalid Fullname")
            }
            if(valid.validateCvv(cvv.value)){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCVVError(true, "Invalid CVV");
            }

            if(valid.validateEmail(cardEmail.value)){
                shouldReturn = true;
                if(navigateTo == 0)
                    navigateTo = 2;
                setCardEmailError(true, "Invalid email")
            }
        }

        switch(navigateTo){
            case 1:
                setFirstDropDisplay(true)
                setSecondDropDisplay(true) 
                firstDropRef.current?.scrollIntoView({behavior: "smooth"})
                break; 
            case 2:
                setSecondDropDisplay(true) 
                secondDropRef.current?.scrollIntoView({behavior: "smooth"})
                break; 
            default: break;
        }

        if(shouldReturn) return

        try{
            setLoading(true);
            const value = cart.cart.reduce((total, item) => total + item.price*item.amount, 0)
            const provision = calculateProvision(value);
            const recreatedProducts = cart.cart.map(({
                id, name, price, stock, amount
            }) => {
                return {id, name, price, stock, amount}
            })
            const orderObj: OrderType = {
                id: crypto.randomUUID(),
                value,
                provision,
                total: value + provision,
                products: recreatedProducts
            }
            await pushOrder(partner?.id ?? "", orderObj)
            if(currentUser && saveCreds){
                try{
                    await updateCredentials(
                        name.value,
                        surname.value,
                        email.value,
                        city.value,
                        address.value,
                        postCode.value,
                        phone.value
                    )
                }catch(error){
                    console.error(error)
                }
            }
            clearCart();
            navigate("/conclusion")
        }catch(error){
            console.error(error)
            setError("Failed to make an order.")
        }
        setLoading(false);
    }

    const methodWritten = useMemo(() => {
        switch(paymentMethod){
            case "cod":
                return "COD"
            case "credit-card":
                return "Credit Card"
            default: 
                return "unset"
        }
    }, [paymentMethod])

    const cartList = useMemo(() => {
        return cart?.cart.map(({
            name,
            thumbnails,
            price,
            amount,
        }) => {
            return <PayFormProduct
                name={name}
                thumbnails={thumbnails}
                price={price}
                amount={amount}
            />
        })
    }, [])

    if (!partnerId)
        return <ErrorComponent />

    return <main className="pay-form__main">
        <h1 className="pay-form__heading">
            {`Your check-out for ${partner?.name}:`}
        </h1>
        <section className="pay-form__form-container">
            <FormComponent
                onSubmit={handleSubmit}
            >
                <DropdownWithContent
                    title="1. Your credentials"
                    display={firstDropDisplay}
                    switchDisplay={switchFirstDisplay}
                    ref={firstDropRef}
                >
                    <div className="pay-form__dropdown-content">
                        <div className="pay-form__double-input-container">
                            <Input

                                placeholder={"Your name"}
                                isError={name.isError}
                                errorMessage={name.errorMessage}
                                value={name.value}
                                onChange={handleNameChange}
                            >
                                Name
                            </Input>
                            <Input
                                placeholder={"Your surname"}
                                isError={surname.isError}
                                errorMessage={surname.errorMessage}
                                value={surname.value}
                                onChange={handleSurnameChange}
                            >
                                Surname
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your address"}
                                isError={address.isError}
                                errorMessage={address.errorMessage}
                                value={address.value}
                                onChange={handleAddressChange}
                            >
                                Address
                            </Input>
                        </div>
                        <div className="pay-form__double-input-container">
                            <Input
                                placeholder={"Post code"}
                                isError={postCode.isError}
                                errorMessage={postCode.errorMessage}
                                value={postCode.value}
                                onChange={handleCodeChange}
                            >
                                Post code
                            </Input>
                            <Input
                                placeholder={"City"}
                                value={city.value}
                                isError={city.isError}
                                errorMessage={city.errorMessage}
                                onChange={handleCityChange}
                            >
                                City
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your Email Address"}
                                isError={email.isError}
                                errorMessage={email.errorMessage}
                                value={email.value}
                                onChange={handleEmailChange}
                            >
                                Email
                            </Input>
                        </div>
                        <div className="pay-form__input-container">
                            <Input
                                placeholder={"Your Phone Number"}
                                isError={phone.isError}
                                errorMessage={phone.errorMessage}
                                value={phone.value}
                                onChange={handlePhoneChange}
                            >
                                Phone number
                            </Input>
                        </div>
                        <div className="pay-form__checkbox-container">
                            <Checkbox
                                value={saveCreds}
                                onSwitch={switchSaveCreds}
                            >
                                Save the following credentials (Uncheck if you already did).
                            </Checkbox>
                        </div>
                    </div>
                </DropdownWithContent>
                <DropdownWithContent
                    title="2. Payment Method"
                    display={secondDropDisplay}
                    switchDisplay={switchSecondDisplay}
                    ref={secondDropRef}
                >
                    <div className="pay-form__radios-container">
                        <Radio
                            groupValue={paymentMethod}
                            heldValue={"cod"}
                            onChoice={() => setPaymentMethod("cod")}
                            height={4}
                        >
                            COD (Cash on arrival)
                        </Radio>
                        <Radio
                            groupValue={paymentMethod}
                            heldValue={"credit-card"}
                            onChoice={() => setPaymentMethod("credit-card")}
                            height={4}
                        >
                            Credit Card
                        </Radio>
                    </div>
                    {
                        paymentMethod == "credit-card"
                            ? <div className="pay-form__credit-card-credentials">
                                <h1 className="pay-form__credit-card-credentials__heading">
                                    Card Holder's Credentials
                                </h1>
                                <div className="pay-form__input-container">
                                    <Input
                                        placeholder={"Your Credit Card Number"}
                                        isError={cardNumber.isError}
                                        errorMessage={cardNumber.errorMessage}
                                        value={cardNumber.value}
                                        onChange={handleCardNumberChange}
                                    >
                                        Card Number
                                    </Input>
                                </div>
                                <div className="pay-form__double-input-container">
                                    <Input
                                        placeholder={"Your Fullname"}
                                        isError={fullname.isError}
                                        errorMessage={fullname.errorMessage}
                                        value={fullname.value}
                                        onChange={handleFullnameChange}
                                    >
                                        Full name
                                    </Input>
                                    <Input
                                        placeholder={"CVV code"}
                                        isError={cvv.isError}
                                        errorMessage={cvv.errorMessage}
                                        value={cvv.value}
                                        onChange={handleCVVChange}
                                    >
                                        CVV
                                    </Input>
                                </div>
                                <div className="pay-form__input-container">
                                    <Input
                                        placeholder={"Your Email Address"}
                                        isError={cardEmail.isError}
                                        errorMessage={cardEmail.errorMessage}
                                        value={cardEmail.value}
                                        onChange={handleCardEmailChange}
                                    >
                                        Email Address
                                    </Input>
                                </div>
                            </div>
                            : <></>
                    }
                </DropdownWithContent>
                <DropdownWithContent
                    title="3. Summary"
                    display={thirdDropDisplay}
                    switchDisplay={switchThirdDisplay}
                >
                    <summary className="pay-form__summary">
                        <h1 className="pay-form__summary-heading">
                            Your credentials
                        </h1>
                        <div className="pay-form__summary-credentials-container">
                            <ul className="pay-form__summary-list">
                                <li className="pay-form__summary-list-item">
                                    {`${name.value} ${surname.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${address.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${postCode.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${city.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${email.value}`}
                                </li>
                                <li className="pay-form__summary-list-item">
                                    {`${phone.value}`}
                                </li>
                            </ul>
                            <ul className="pay-form__summary-list">
                                <li className="pay-form__summary-list-item">
                                    {`Payment Method: ${methodWritten}`}
                                </li>
                                {
                                    paymentMethod == "credit-card"
                                        ? <>
                                            <li className="pay-form__summary-list-item">
                                                {`${fullname.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cardNumber.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cvv.value}`}
                                            </li>
                                            <li className="pay-form__summary-list-item">
                                                {`${cardEmail.value}`}
                                            </li>
                                        </>
                                        : null
                                }
                            </ul>
                        </div>
                        <div className="pay-form__cart-products">
                            {cartList}
                        </div>
                        <Button
                            role="submit"
                            type="primary"
                            loading={loading}
                            disabled={loading}
                        >
                            Pay now!
                        </Button>
                    </summary>
                </DropdownWithContent>
            </FormComponent>
        </section>
    </main>
}

export default PayForm
