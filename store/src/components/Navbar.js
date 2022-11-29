import {Button, Container, Navbar, Modal} from 'react-bootstrap' // componentes ya hechos de la libreria react-bootstrap
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import { getProductData } from '../productsStore';
import CartProduct from './CartProduct';


export default function NavbarComponent(){

    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('https://react-ecommerce-project-production.up.railway.app/checkout', { //'http://localhost:3001/checkout'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => { //manejando la rspta
            return response.json(); //this turns the response into json format, easy to interpret
        }).then((response) => {
            if(response.url){
                window.location.assign(response.url); // Forwarding user to Stripe
            }
        }) 
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0) // suma 0 + product.quantity de cada producto en el array de items que es nuestro estado cartProducts. Reduce retorna un valor, un numero.

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return(
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/"
                style={{
                    backgroundColor: isHovering ? 'salmon' : '',
                    color: isHovering ? 'white' : '',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                Ecommerce Store
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className='justify-content-end'>
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((Product, idx) => (
                                // <h5>Product: {getProductData(Product.id).title} - Quantity: {cart.getProductQuantity(Product.id)}</h5> Esto lo hacia al no tener un componente CartProduct
                                <CartProduct key={idx} id={Product.id} quantity={Product.quantity}></CartProduct>
                            ))}
                            <h1>Total: {cart.getTotalCostOfTheCart().toFixed(2)}</h1> {/* .toFixed(2) para que solo queden 2 decimales despues del punto*/}

                            <Button variant='success' onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    :
                        <h4>There are no items in your cart yet</h4>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

