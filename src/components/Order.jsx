import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState, useContext } from 'react';
import { CartContext } from './Cart';

const OrderPage = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const [quantity, setCart] = useState(1);

    const handleIncrease = (itemId) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                console.log(true)
                item['quantity'] = item['quantity'] + 1
                console.log(item['quantity'])
            }
            return item;
        });
        setCart(updatedCart);
    };

    const handleDecrease = (itemId) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId && item.quantity > 1) {
                item['quantity'] = item['quantity'] - 1
            }
            return item;
        });
        console.log(cart)
        setCart(updatedCart);
    };

    const handleDelete = (itemId) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                console.log(item.id)
                cart.splice(cart.indexOf(item), 1)
            }
            return;
        });
        setCart(updatedCart);
        removeFromCart(cart);
    }

    const totalSum = cart.reduce((accumulator, currentItem) => {
        const subtotal = currentItem.price * currentItem.quantity;
        return accumulator + subtotal;
    }, 0);

    return (
        <div className="orderpage">
            <section className="h-100 gradient-custom">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            <MDBCard className="mb-4">
                                <MDBCardHeader className="py-3">
                                    <MDBTypography tag="h5" className="mb-0">
                                        Cart - {cart.length} items
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    {cart.map((element) => <MDBRow>
                                        <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                            <MDBRipple rippleTag="div" rippleColor="light"
                                                className="bg-image rounded hover-zoom hover-overlay">
                                                <img
                                                    src={element['image']}
                                                    className="w-100" />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                    </div>
                                                </a>
                                            </MDBRipple>
                                        </MDBCol>

                                        <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                            <p>
                                                <strong>{element['name']}</strong>
                                            </p>
                                            <p>{element['category']}</p>
                                            <p>{element['description']}</p>

                                            <MDBBtn className="delete-btn" onClick={() => handleDelete(element.id)}>
                                                <MDBIcon fas icon="trash" />
                                            </MDBBtn>

                                            <MDBBtn>
                                                <MDBIcon fas icon="heart" />
                                            </MDBBtn>
                                        </MDBCol>
                                        <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                <MDBBtn className="px-3 me-2" onClick={() => handleDecrease(element.id)}>
                                                    <MDBIcon fas icon="minus" />
                                                </MDBBtn>

                                                <MDBInput defaultValue={1} min={0} type="number" label="Quantity" value={element.quantity} />

                                                <MDBBtn className="px-3 ms-2" onClick={() => handleIncrease(element.id)}>
                                                    <MDBIcon fas icon="plus" />
                                                </MDBBtn>
                                            </div>

                                            <p className="text-start text-md-center">
                                                <strong>${element['price'] * element['quantity']}.00</strong>
                                            </p>
                                        </MDBCol>
                                        <hr className="my-4" />
                                    </MDBRow>
                                    )}
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <p>
                                        <strong>Expected shipping delivery</strong>
                                    </p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody>
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                        alt="PayPal acceptance mark" />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBCard className="mb-4">
                                <MDBCardHeader>
                                    <MDBTypography tag="h5" className="mb-0">
                                        Summary
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBListGroup flush>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>${totalSum}</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>$1000</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>${totalSum + 1000}</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>

                                    <MDBBtn block size="lg">
                                        Go to checkout
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div >
    )
}

export default OrderPage;
