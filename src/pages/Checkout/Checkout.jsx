// Checkout.jsx
import React, { useContext, useState, useEffect } from 'react'; // Import useEffect
import Footer from "../../components/Footer/Footer";
import { CartContext } from '../../context/CartContext';
import './Checkout.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

function Checkout(){

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

    const navigate = useNavigate();
    const location = useLocation(); // Get location object to access passed state

    const { cartItems } = useContext(CartContext);
    console.log("Current Cart Items from Context:", cartItems);

    // State to hold the items being checked out
    const [checkoutItems, setCheckoutItems] = useState([]);

    // Check if buyNowItem was passed via location state on component mount
    useEffect(() => {
        if (location.state && location.state.buyNowItem) {
            // If a buyNowItem exists, use it as the only item for checkout
            setCheckoutItems([location.state.buyNowItem]);
            console.log("Checkout via Buy Now:", location.state.buyNowItem);
        } else {
            // Otherwise, use the items from the CartContext
            setCheckoutItems(cartItems);
            console.log("Checkout via Cart:", cartItems);
        }
    }, [location.state, cartItems]); // Re-run if location state or cartItems change

    const [contactMail, setContactMail] = useState({
        email: '',
        newsletterConsent: false,
    });

    const [shippingAddress, setShippingAddress] = useState({
        country: 'India', // Default value
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        saveInformation: false,
    });

    const [billingAddress, setBillingAddress] = useState({
        country: 'India',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardHolderName: '',
        useShippingAsBilling: true,
    });

    const [shippingMethod, setShippingMethod] = useState('standard');
    const [shippingCost, setShippingCost] = useState(22.50);

    // Calculate subtotal and total items based on checkoutItems
    const subtotal = checkoutItems.reduce((total, item) => {
        return total + (parseFloat(String(item.price).replace("$", "") || 0) * (item.quantity || 0));
    }, 0);

    const totalItems = checkoutItems.reduce((total, item) => {
        return total + (item.quantity || 0);
    }, 0);

    const grandTotal = subtotal + shippingCost;

    const handleContactInfoChange = (e) => {
        const { id, value, type, checked } = e.target;
        setContactMail(prevInfo => ({
            ...prevInfo,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleShippingAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setShippingAddress(prevAddress => ({
            ...prevAddress,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBillingAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBillingAddress(prevBilling => ({
            ...prevBilling,
            [name]: value
        }));
    };

    const handlePaymentDetailsChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'expiryDate') {
            const formattedValue = value.replace(/\D/g, '').substring(0, 4);
            let displayValue = formattedValue;
            if (formattedValue.length > 2) {
                displayValue = `${formattedValue.substring(0, 2)} / ${formattedValue.substring(2)}`;
            }
            setPaymentDetails(prevDetails => ({
                ...prevDetails,
                [name]: displayValue
            }));
        } else if (name === 'cardNumber') {
            const cleanedValue = value.replace(/\s/g, '').replace(/\D/g, '');
            const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';
            setPaymentDetails(prevDetails => ({
                ...prevDetails,
                [name]: formattedValue
            }));
        }
        else {
            setPaymentDetails(prevDetails => ({
                ...prevDetails,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleShippingMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setShippingMethod(selectedMethod);

        switch (selectedMethod) {
            case 'standard':
                setShippingCost(22.50);
                break;
            case 'express':
                setShippingCost(50.00);
                break;
            case 'priority':
                setShippingCost(100.00);
                break;
            default:
                setShippingCost(0);
        }
    };

    // Use checkoutItems here for logging
    checkoutItems.forEach((item, index) => {
        console.log(`Checkout Item ${index}:`, item);
        if (!item._id) {
            console.warn(`Checkout Item ${index} is missing an '_id' property or '_id' is undefined.`);
        }
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!contactMail.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(contactMail.email)) {
            newErrors.email = 'Email address is invalid.';
        }

        if (!shippingAddress.firstName) newErrors.firstName = 'First name is required.';
        if (!shippingAddress.lastName) newErrors.lastName = 'Last name is required.';
        if (!shippingAddress.address) newErrors.address = 'Address is required.';
        if (!shippingAddress.city) newErrors.city = 'City is required.';
        if (!shippingAddress.state) newErrors.state = 'State is required.';
        if (!shippingAddress.zip) {
            newErrors.zip = 'Zip code is required.';
        } else if (!/^[a-zA-Z0-9\s-]+$/.test(shippingAddress.zip)) {
            newErrors.zip = 'Zip code is invalid.';
        }

        if (!paymentDetails.useShippingAsBilling) {
            if (!billingAddress.firstName) newErrors.billingFirstName = 'First name is required.';
            if (!billingAddress.lastName) newErrors.billingLastName = 'Last name is required.';
            if (!billingAddress.address) newErrors.billingAddress = 'Address is required.';
            if (!billingAddress.city) newErrors.billingCity = 'City is required.';
            if (!billingAddress.state) newErrors.billingState = 'State is required.';
            if (!billingAddress.zip) {
                newErrors.billingZip = 'Zip code is required.';
            } else if (!/^[a-zA-Z0-9\s-]+$/.test(billingAddress.zip)) {
                newErrors.billingZip = 'Zip code is invalid.';
            }
        }

        // Card Number Validation
        if (!paymentDetails.cardNumber) {
            newErrors.cardNumber = 'Card number is required.';
        } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Card number must be 16 digits.';
        }

        // Expiry Date Validation
        if (!paymentDetails.expiryDate) {
            newErrors.expiryDate = 'Expiry date is required.';
        } else {
            const cleanedExpiry = paymentDetails.expiryDate.replace(/\s|\//g, '');
            const match = cleanedExpiry.match(/^(0[1-9]|1[0-2])([0-9]{2})$/);

            if (!match) {
                newErrors.expiryDate = 'Invalid format (MM / YY).';
            } else {
                const month = parseInt(match[1], 10);
                const year = 2000 + parseInt(match[2], 10);

                const today = new Date();
                const currentMonth = today.getMonth() + 1;
                const currentYear = today.getFullYear();

                if (year < currentYear || (year === currentYear && month < currentMonth)) {
                    newErrors.expiryDate = 'Expiry date cannot be in the past.';
                }
            }
        }

        // Security Code Validation
        if (!paymentDetails.securityCode) {
            newErrors.securityCode = 'Security code is required.';
        } else if (!/^\d{3,4}$/.test(paymentDetails.securityCode)) {
            newErrors.securityCode = 'Invalid code (3 or 4 digits).';
        }
        if (!paymentDetails.cardHolderName) newErrors.cardHolderName = 'Card holder name is required.';

        if (!shippingMethod) {
            newErrors.shippingMethod = 'Please select a shipping method.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            // Use checkoutItems for order submission
            const processedCheckoutItems = checkoutItems.map(item => ({
                ...item,
                price: parseFloat(String(item.price).replace('$', '')),
                _id: String(item._id)
            }));

            const orderData = {
                contactMail,
                shippingAddress,
                billingAddress: paymentDetails.useShippingAsBilling ? shippingAddress : billingAddress,
                paymentDetails: {
                    ...paymentDetails,
                    cardNumber: paymentDetails.cardNumber.replace(/\s/g, ''),
                    expiryDate: paymentDetails.expiryDate.replace(/\s|\//g, ''),
                },
                shippingMethod,
                shippingCost,
                subtotal: subtotal.toFixed(2),
                totalItems,
                grandTotal: grandTotal.toFixed(2),
                cartItems: processedCheckoutItems // Use processedCheckoutItems for the order
            };

            try {
                const response = await fetch(`${backendUrl}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Order placed successfully:', result);
                    // IMPORTANT: Clear cart if the checkout was from the main cart
                    // But DO NOT clear if it was a "Buy Now" item, as that item wasn't in the global cart
                    if (!location.state || !location.state.buyNowItem) {
                        setCartItems([]); // Clear only if it was a normal cart checkout
                    }
                    navigate('/thankyou');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to place order:', errorData);
                    alert(`Order placement failed: ${errorData.message || 'Unknown error'}. Details: ${errorData.error || 'No specific details provided.'}`);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error processing your order. Please try again.');
            }
        } else {
            console.log("Form has validation errors.");
        }
    };

    return(
        <>
            <div className="main_content_wrapper">
                <section className="checkout_section py-10 bg-cream-100">
                    <div className="container max-w-[1320px] mx-auto px-4">
                        <div className="section_content_wrapper flex flex-wrap items-start justify-between">
                            <div className="customer_information_area w-[58%]">
                                <form id="checkout_form" className="checkout_form" onSubmit={handleFormSubmission}>
                                    <div className="form_row contact">
                                        <div className="form_group relative">
                                            <label htmlFor="email" className="form_label block text-[25px] font-semibold font-urbanist">Contact</label>
                                            <a href="/signin" className="login_link absolute right-0 top-2 underline">Login</a>
                                            <input type="email" id="email" className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full mt-3" placeholder="Email" value={contactMail.email} onChange={handleContactInfoChange} />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div className="conscent_box mt-3">
                                            <div className="form_group flex items-center justify-start">
                                                 <input id="conscent_newsletter" type="checkbox" className="form_control mr-2" checked={contactMail.conscent_newsletter} onChange={handleContactInfoChange} />
                                                 <label htmlFor="conscent_newsletter" className="text-black font-urbanist text-[16px] pl-1">Email me with news and offers</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form_row delivery mt-5">
                                        <div className="form_row_header block text-[25px] font-semibold font-urbanist">Delivery</div>
                                        <div className="form_group relative country w-full">
                                            <select
                                                name="country"
                                                id="country"
                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full mt-3 text-gray-500 appearance-none"
                                                value={shippingAddress.country}
                                                onChange={handleShippingAddressChange}
                                            >
                                                <option value="Europe">Europe</option>
                                                <option value="India">India</option>
                                                <option value="America">America</option>
                                            </select>
                                            <div className="icon_wrapper bg-white w-[15px] h-[15px] flex items-center justify-center absolute top-7 right-2 text-gray-500"><i className="fi fi-ss-angle-small-down flex"></i></div>
                                        </div>
                                        <div className="form_group customer_name flex flex-wrap justify-between items-start mt-4">
                                             <div className=" first_name w-[49%]">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                    placeholder="First Name"
                                                    value={shippingAddress.firstName}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                            </div>
                                            <div className="form_group last_name w-[49%]">
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                    placeholder="Last Name"
                                                    value={shippingAddress.lastName}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                            </div>
                                        </div>
                                       <div className="form_group address mt-4">
                                            <input
                                                type="text"
                                                name="address"
                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                placeholder="Address"
                                                value={shippingAddress.address}
                                                onChange={handleShippingAddressChange}
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                       </div>
                                       <div className="form_group apartment mt-4">
                                            <input
                                                type="text"
                                                name="apartment"
                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                placeholder="Apartment"
                                                value={shippingAddress.apartment}
                                                onChange={handleShippingAddressChange}
                                            />
                                            {errors.apartment && <p className="text-red-500 text-sm mt-1">{errors.apartment}</p>}
                                       </div>
                                       <div className="form_group city_state_pin mt-4 flex flex-wrap justify-between items-start">
                                            <div className="city w-[32%]">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                    placeholder="City"
                                                    value={shippingAddress.city}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                            </div>
                                            <div className="state w-[32%]">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                    placeholder="State"
                                                    value={shippingAddress.state}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                            </div>
                                            <div className="zip w-[32%]">
                                                <input
                                                    type="text"
                                                    name="zip"
                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                    placeholder="Zip"
                                                    value={shippingAddress.zip}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                                            </div>
                                       </div>
                                      <div className="conscent_box mt-3">
                                            <div className="form_group flex items-center justify-start">
                                                <input
                                                    id="saveInformation"
                                                    type="checkbox"
                                                    className="form_control mr-2"
                                                    name="saveInformation"
                                                    checked={shippingAddress.saveInformation}
                                                    onChange={handleShippingAddressChange}
                                                />
                                                <label htmlFor="saveInformation" className="text-black font-urbanist text-[16px] pl-1">Save this information for next time</label>
                                            </div>
                                        </div>
                                        <div className="shipping_method_wrapper mt-5">
                                            <h5 className="font-semibold">Shipping Method</h5>

                                            <div className="form_group shipping_option flex items-center justify-between mt-2 py-3 px-5 bg-white border border-gray-300 w-full mb-2 rounded">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="standardShipping"
                                                        name="shippingOption"
                                                        value="standard"
                                                        checked={shippingMethod === 'standard'}
                                                        onChange={handleShippingMethodChange}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="standardShipping" className="shippig_method font-urbanist font-medium text-black">Standard Shipping</label>
                                                </div>
                                                <span className="price font-semibold text-black">${(22.50).toFixed(2)}</span>
                                            </div>

                                            <div className="form_group shipping_option flex items-center justify-between py-3 px-5 bg-white border border-gray-300 w-full mb-2 rounded">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="expressShipping"
                                                        name="shippingOption"
                                                        value="express"
                                                        checked={shippingMethod === 'express'}
                                                        onChange={handleShippingMethodChange}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="expressShipping" className="shippig_method font-urbanist font-medium text-black">Express Shipping</label>
                                                </div>
                                                <span className="price font-semibold text-black">${(50.00).toFixed(2)}</span>
                                            </div>

                                            <div className="form_group shipping_option flex items-center justify-between py-3 px-5 bg-white border border-gray-300 w-full rounded">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="priorityShipping"
                                                        name="shippingOption"
                                                        value="priority"
                                                        checked={shippingMethod === 'priority'}
                                                        onChange={handleShippingMethodChange}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor="priorityShipping" className="shippig_method font-urbanist font-medium text-black">Priority Shipping</label>
                                                </div>
                                                <span className="price font-semibold text-black">${(100.00).toFixed(2)}</span>
                                            </div>
                                            {errors.shippingMethod && <p className="text-red-500 text-sm mt-1">{errors.shippingMethod}</p>}
                                        </div>
                                    </div>
                                    <div className="form_row payment_details mt-5">
                                        <h4 className="form_label block text-[25px] font-semibold font-urbanist">Payment</h4>
                                        <p className="text-gray text-[15px]">All transactions are secure and encrypted.</p>
                                        <div className="card_details_wrapper mt-5">
                                            <div className="credit_card_header px-5 py-3 bg-cream-400">
                                                <h4 className="text-black font-medium text-[17px]">Credit Card</h4>
                                            </div>
                                            <div className="card_details bg-white p-5 flex flex-wrap justify-between border-1 border-gray-200">
                                                <div className="form_group card_number relative w-[100%]">
                                                    <input
                                                        className="form_control py-3 px-5 bg-gray-100 border-0 border-gray-300 w-full mt-3"
                                                        type="text"
                                                        name="cardNumber"
                                                        id="cardNumber"
                                                        placeholder="Card Number"
                                                        value={paymentDetails.cardNumber}
                                                        onChange={handlePaymentDetailsChange}
                                                    />
                                                    <span className="icon_wrapper absolute top-7 right-4"><i className="fi fi-rr-lock"></i></span>
                                                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                                </div>
                                                <div className="form_group expiry_date relative w-[49%]">
                                                    <input
                                                        className="form_control py-3 px-5 bg-gray-100 border-0 border-gray-300 w-full mt-3"
                                                        type="text"
                                                        name="expiryDate"
                                                        id="expiryDate"
                                                        placeholder="Expiration Date (MM / YY)"
                                                        value={paymentDetails.expiryDate}
                                                        onChange={handlePaymentDetailsChange}
                                                    />
                                                    {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                                </div>
                                                <div className="form_group expiry_date relative w-[49%]">
                                                    <input
                                                        className="form_control py-3 px-5 bg-gray-100 border-0 border-gray-300 w-full mt-3"
                                                        type="text"
                                                        name="securityCode"
                                                        id="securityCode"
                                                        placeholder="Security Code"
                                                        value={paymentDetails.securityCode}
                                                        onChange={handlePaymentDetailsChange}
                                                    />
                                                    <span className="icon_wrapper absolute top-7 right-4 cursor-pointer"><i className="fi fi-rr-comment-info"></i></span>
                                                    {errors.securityCode && <p className="text-red-500 text-sm mt-1">{errors.securityCode}</p>}
                                                </div>
                                                <div className="form_group card_holder_name relative w-full">
                                                    <input
                                                        className="form_control py-3 px-5 bg-gray-100 border-0 border-gray-300 w-full mt-3"
                                                        type="text"
                                                        name="cardHolderName"
                                                        id="cardHolderName"
                                                        placeholder="Name On Card"
                                                        value={paymentDetails.cardHolderName}
                                                        onChange={handlePaymentDetailsChange}
                                                    />
                                                    {errors.cardHolderName && <p className="text-red-500 text-sm mt-1">{errors.cardHolderName}</p>}
                                                </div>
                                                <div className="conscent_box mt-3">
                                                    <div className="form_group flex items-center justify-start">
                                                        <input
                                                            id="useShippingAsBilling"
                                                            type="checkbox"
                                                            className="form_control mr-2"
                                                            name="useShippingAsBilling"
                                                            checked={paymentDetails.useShippingAsBilling}
                                                            onChange={handlePaymentDetailsChange}
                                                        />
                                                        <label htmlFor="useShippingAsBilling" className="text-black font-urbanist text-[16px] pl-1">Use shipping address as billing address</label>
                                                    </div>
                                                </div>
                                                {!paymentDetails.useShippingAsBilling && (
                                                    <div className="billing_address_form mt-5 w-full">
                                                        <h5 className="font-semibold mb-3">Billing Address</h5>
                                                        <div className="form_group relative country w-full">
                                                            <select
                                                                name="country"
                                                                id="billingCountry"
                                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full mt-3 text-gray-500 appearance-none"
                                                                value={billingAddress.country}
                                                                onChange={handleBillingAddressChange}
                                                            >
                                                                <option value="Europe">Europe</option>
                                                                <option value="India">India</option>
                                                                <option value="America">America</option>
                                                            </select>
                                                            <div className="icon_wrapper bg-white w-[15px] h-[15px] flex items-center justify-center absolute top-7 right-2 text-gray-500"><i className="fi fi-ss-angle-small-down flex"></i></div>
                                                        </div>
                                                        <div className="form_group customer_name flex flex-wrap justify-between items-start mt-4">
                                                            <div className="first_name w-[49%]">
                                                                <input
                                                                    type="text"
                                                                    name="firstName"
                                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                    placeholder="First Name"
                                                                    value={billingAddress.firstName}
                                                                    onChange={handleBillingAddressChange}
                                                                />
                                                                {errors.billingFirstName && <p className="text-red-500 text-sm mt-1">{errors.billingFirstName}</p>}
                                                            </div>
                                                            <div className="form_group last_name w-[49%]">
                                                                <input
                                                                    type="text"
                                                                    name="lastName"
                                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                    placeholder="Last Name"
                                                                    value={billingAddress.lastName}
                                                                    onChange={handleBillingAddressChange}
                                                                />
                                                                {errors.billingLastName && <p className="text-red-500 text-sm mt-1">{errors.billingLastName}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="form_group address mt-4">
                                                            <input
                                                                type="text"
                                                                name="address"
                                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                placeholder="Address"
                                                                value={billingAddress.address}
                                                                onChange={handleBillingAddressChange}
                                                            />
                                                            {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                                                        </div>
                                                        <div className="form_group apartment mt-4">
                                                            <input
                                                                type="text"
                                                                name="apartment"
                                                                className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                placeholder="Apartment"
                                                                value={billingAddress.apartment}
                                                                onChange={handleBillingAddressChange}
                                                            />
                                                            {errors.billingApartment && <p className="text-red-500 text-sm mt-1">{errors.billingApartment}</p>}
                                                        </div>
                                                        <div className="form_group city_state_pin mt-4 flex flex-wrap justify-between items-start">
                                                            <div className="city w-[32%]">
                                                                <input
                                                                    type="text"
                                                                    name="city"
                                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                    placeholder="City"
                                                                    value={billingAddress.city}
                                                                    onChange={handleBillingAddressChange}
                                                                />
                                                                {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                                                            </div>
                                                            <div className="state w-[32%]">
                                                                <input
                                                                    type="text"
                                                                    name="state"
                                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                    placeholder="State"
                                                                    value={billingAddress.state}
                                                                    onChange={handleBillingAddressChange}
                                                                />
                                                                {errors.billingState && <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>}
                                                            </div>
                                                            <div className="zip w-[32%]">
                                                                <input
                                                                    type="text"
                                                                    name="zip"
                                                                    className="form_control py-3 px-5 bg-white border-1 border-gray-300 w-full"
                                                                    placeholder="Zip"
                                                                    value={billingAddress.zip}
                                                                    onChange={handleBillingAddressChange}
                                                                />
                                                                {errors.billingZip && <p className="text-red-500 text-sm mt-1">{errors.billingZip}</p>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit_btn_wrapper form_row mt-8">
                                        <button type="submit" className="bg-brown-600 text-center font-semibold text-white px-5 py-3 w-full cursor-pointer">Pay Now</button>
                                    </div>
                                </form>
                            </div>
                            <div className="order_summary_wrapper w-[38%] sticky top-25">
                                <div className="inner_content_wrapper bg-cream-400 p-5">
                                    <div className="product_row_wrapper pr-2">
                                        {/* Loop through checkoutItems instead of cartItems */}
                                        {checkoutItems.map((item) => (
                                            <div className="product_row flex items-center justify-start bg-white p-3 relative mb-2" key={item._id}>
                                                <div className="product_img w-[70px] h-[70px] flex justify-center items-center bg-gray-200 mr-3 relative">
                                                    <img className="max-w-1/2" src={`${backendUrl}/uploads/${item.imageUrl}`} alt={item.name} /> {/* Ensure item.imageUrl */}
                                                    <div className="product_no absolute w-[20px] h-[20px] bg-cream-400 text-[12px] font-bold rounded-full flex items-center justify-center z-2 -top-1 -right-1 leading-4">{item.quantity}</div>
                                                </div>
                                                <div className="product_information w-[200px]">
                                                    <h4 className="product_title text-[16px] text-black font-semibold">{item.name}</h4>
                                                    {item.description && <p className="product_description text-[13px] text-gray">{item.description}</p>}
                                                </div>
                                                <div className="product_price ml-auto mr-2">
                                                    <h3 className=" text-black font-bold text-[17px]">${(parseFloat(String(item.price).replace('$', '')) * item.quantity).toFixed(2)}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="product_total_price_wrapper mt-10 static top-5">
                                        <div className="product_price_row flex items-center justify-between mb-2">
                                            <p className="text-black text-[15px] font-urbanist font-medium">Subtotal · {totalItems} items</p>
                                            <h4 className="text-black text-[18px] font-bold">${subtotal.toFixed(2)}</h4>
                                        </div>
                                        <div className="shipping_price_row flex items-center justify-between mb-2">
                                            <p className="text-black text-[15px] font-urbanist font-medium">Shipping</p>
                                            <h4 className="text-black text-[18px] font-bold">${shippingCost.toFixed(2)}</h4>
                                        </div>
                                        <hr className="mb-2"></hr>
                                        <div className="total_price_row flex items-center justify-between mb-2">
                                            <p className="text-black text-[15px] font-urbanist font-bold">Total</p>
                                            <h4 className="text-black text-[18px] font-bold">${grandTotal.toFixed(2)}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;