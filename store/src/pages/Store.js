import {Row, Col} from 'react-bootstrap';
import { productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard';

export default function Store(){
    return(
        <>
            <h1 align="center" className='p-3'>Welcome to the store!</h1>
            <Row xs={1} md={3} className="g-4">
                {productsArray.map((product, idx) => (
                    <Col align='center' key={idx}>
                        <ProductCard product={product}/>
                        {/* <h1>{product.title}</h1> */}
                    </Col>        
                ))}

                {/*
                <Col align='center'>
                    <h1>Product</h1>
                </Col>
                <Col align='center'>
                    <h1>Product</h1>
                </Col>
                <Col align='center'>
                    <h1>Product</h1>
                </Col>
                <Col align='center'>
                    <h1>Product</h1>
                </Col> 
                */}
            </Row> {/* En una pantaña pequeña queremos mostrar 1 sola fila, en una mediana queremos mostrar 3*/}
        </>
    )
}