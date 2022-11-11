import {Card, Button, From, Row, Col, Form} from 'react-bootstrap';
import { CartContext } from '../CartContext'; //importar el cartContext que creamos.
import { useContext } from 'react'; // e importar el hook useContext de react.

export default function ProductCard(props){ // props.product is the product we are selling

    const product = props.product;

    const cart = useContext(CartContext) // le asigno a una variable el contexto que hice dentro del hook useContext, luego al hacer cart. me salen todas las propiedades variables/metodos dentro del objeto CartContext que cree.

    const productQuantity = cart.getProductQuantity(product.id)

    console.log(cart.items);

    return(
        <Card>
            <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                {/* <Button variant='primary' onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button> */}
                {productQuantity > 0 ?
                    <>
                        <Form as={Row}>
                            <Form.Label column='true' sm='6'>In Cart: {productQuantity}</Form.Label>
                            <Col sm='6'>
                                <Button sm='6' onClick={() => cart.addOneToCart(product.id)} className='mx-2'>+</Button>
                                <Button sm='6' onClick={() => cart.removeOneFromCart(product.id)} className='mx-2'>-</Button>
                            </Col>
                        </Form>
                        <Button variant='danger' onClick={() => cart.deleteFromCart(product.id)} className='my-2'>
                            Remove from cart
                        </Button>
                    </>
                    :
                    <Button variant='primary' onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
                }  
            </Card.Body>
        </Card>
    )

}