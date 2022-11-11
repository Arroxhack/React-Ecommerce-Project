// Coffee: price_1M2hDuJ4b09Ml847M5A8J2id
// Bread: price_1M2hFmJ4b09Ml847kquMqROw
// Egg: price_1M2hH3J4b09Ml847SRakawS8

const productsArray = [
    {
        id: "price_1M2hDuJ4b09Ml847M5A8J2id",
        title: "Coffee",
        price: 4.99
    },
    {
        id: "price_1M2hFmJ4b09Ml847kquMqROw",
        title: "Bread",
        price: 2.99
    },
    {
        id: "price_1M2hH3J4b09Ml847SRakawS8",
        title: "Egg",
        price: 0.99
    },
]

function getProductData(id){
    let productData = productsArray.find(product => product.id === id) // .find recorre el arreglo y devuelve el producto cuyo id corresponda con el id pasado a la funcion. Si no encuentra ninguno que corresponda retorna undefined
    if(productData === undefined){
        console.log("Product data does not exist for ID: " + id);
    }

    return productData; // o undefined si no encuentra ninguno que coincida.
}

export {productsArray, getProductData}; // esto nos permite darle esta array a cualquier componenete dentro de nuestro proyecto con solo hacer import {productsArray} from '../productsStore.js' ademas de poder llamara a la funcion getProductData importandola tambien.