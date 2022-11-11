import { createContext, useState } from "react"; // context is good for data or function that you need through many parts of your aplication.
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({ //we initialize it by creating an object
    items: [],
    // to add functions to our context we use arrow function with no logic like this -> () => {}. That lets us define a function for getProductQuantity, but we are going to do that outside of createContext
    getProductQuantity: () => {}, // this means that a function should be here. We have room for a function to be here xD.
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCostOfTheCart: () => {}
})

export function CartProvider({children}){

    const [cartProducts, setCartProducts] = useState([]);

    // cartProducts -> [{id: 1, quantity: 2}] -> cart that has 2 id 1 items.

    function getProductQuantity(id){
        const quantity = cartProducts.find(p => p.id === id)?.quantity // find devuelve el valor del primer elemento del array que cumple con la condicion proporcionada. Agregamos el condicional ternario ? para que solo busque .quantity si encontro uno que coincide con el id, de esa forma nos salvamos de un error al buscar undefined.quantity. 
        if(quantity === undefined){
            return 0;
        }
        return quantity;   
    }
    
    function addOneToCart(id){
        const quantity = getProductQuantity(id); // con esto vemos si ya hay agregado un producto con el id en el carrito o no. Dependiendo de eso es si simplemente tenemos que agregar +1 quantity a un objeto producto que ya esta en el carrito array o si tenemos que agregar todo un objeto producto nuevo al carrito array.

        if(quantity === 0){ // sabemos que no hay un objeto aun en el carrito.
            setCartProducts((cartProducts) => [...cartProducts, {id: id, quantity:1}])
        } else { // ya hay un objeto producto al que debemos sumarle quantity
            setCartProducts(
                cartProducts.map(product => {  // example: cartProducts -> [{id: 1, quantity: 2}, {id: 2, quantity: 2}]
                    if(product.id === id){ //true
                        return (
                            /* (cartProducts) => cartProducts,  */{...product, quantity: product.quantity + 1}
                        )
                    } else { //false
                        return (
                            product
                        )
                    }
                })
            )
        }
    }

    function deleteFromCart(id){
        setCartProducts((cartProducts) => cartProducts.filter(p => p.id !== id))
    }

    function removeOneFromCart(id){
        const quantity = getProductQuantity(id);

        if(quantity === 1){
            deleteFromCart(id);
        } else {
            setCartProducts(cartProducts.map(product => {
                if(product.id === id){
                    return (
                        /* (cartProducts) => cartProducts,  */{...product, quantity: product.quantity - 1}
                    )
                } else {
                    return (
                         product
                    )
                }
            }))
        }
    }

    function getTotalCostOfTheCart(){
        let totalCost = 0;
        /* const finalCost = cartProducts.map(product => getProductData(product.id).price * getProductQuantity(product.id)).reduce((previousValue, currentValue) => previousValue + currentValue, totalCost)
        return finalCost */
        cartProducts.forEach(product => { //forEach mejor que map ya que solo loopeo y no necesito que devuelva un array.
            const productData = getProductData(product.id);
            totalCost += (productData.price * product.quantity)
        });
        return totalCost;
      /*   {
            id: "1",
            title: "Coffee",
            price: 4.99
        }, */
    }

    const contextValue = {
        items: cartProducts, // al ppio items es un array vacio.
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCostOfTheCart
    } 
        return(
            <CartContext.Provider value={contextValue}>
                {children}
            </CartContext.Provider>
        )
}

export default CartProvider;

// When we create the functions we are going to use the cartProduct state to manipulate what our provider is giving to the rest of teh aplication.

// This code will help us create the full code for getProductQuantity, and when we have a function for getProductQuantity we are going to pass that to our provider. 

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context