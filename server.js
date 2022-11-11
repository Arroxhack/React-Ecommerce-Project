// Secret stripe key: sk_test_51M2h7eJ4b09Ml8471NiYgGl2tcg6hxZT6EvOCLlNeHdaKMSj1DTNTOw3LzWYPXoV414uu3O64oQ1i3HnwrXEG0DP00lixjet7B
// Coffee: price_1M2hDuJ4b09Ml847M5A8J2id
// Bread: price_1M2hFmJ4b09Ml847kquMqROw
// Egg: price_1M2hH3J4b09Ml847SRakawS8

const express = require('express'); // express servers
var cors = require('cors'); // it allows any ip adress to access our express server
const stripe = require('stripe') ('sk_test_51M2h7eJ4b09Ml8471NiYgGl2tcg6hxZT6EvOCLlNeHdaKMSj1DTNTOw3LzWYPXoV414uu3O64oQ1i3HnwrXEG0DP00lixjet7B');
//initializing stripe client 

const app = express(); // initializing our express server.
app.use(cors()); //app.use middleware cors
app.use(express.static("public")); //stripe recomends to do this
app.use(express.json());

app.post("/checkout", async (req, res) => {
    /* 
    req.body.items
    [
        {
            id:1,
            quantity:3
        }
    ]
    stripe wants data formated in this way
    [
        {
            price:1,
            quantity:3
        }
    ]
    */
    console.log("req.body: ", req.body) // aca para verlo en consola
    const items = req.body.items;
    let lineItems = []; // formated data that we are sending to stripe
    items.forEach(item => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        })
    });

    const session = await stripe.checkout.sessions.create({ //initializing stripe session // using stripe object
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
    });

    res.send(JSON.stringify({ //allows us to send an object to the front end // we show the user the session that stripe create for them
        url: session.url
    }));
});

app.listen(3001, () => console.log('Listening on port 3001!'))

