const express =require('express')
const Razorpay = require('razorpay')
const mongoose=require('mongoose')
const app= express()
const cors = require('cors');
const Product=require('./models/Signin')
const port=8000



// const axios = require('axios');

// const razorpayApiKey = 'rzp_test_dsqpBlsd93gkpG';
// const razorpayApiSecret = 'TELsj1NBPn6xmgqtFqyM9tAn';

// const instance = axios.create({
//   baseURL: 'https://api.razorpay.com/v1',
//   headers: {
//     'Authorization': `Basic ${Buffer.from(`${razorpayApiKey}:${razorpayApiSecret}`).toString('base64')}`,
//   },
// });

// // Make a request using the instance
// instance.get('/some-endpoint')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:'false'}))

app.get('/',(req,res) => {
    res.send("Hello NODE dreama API")
})

//login
app.post('/signin/:username',async(req,res)=>{
    try {
        const {username}=req.params
        const signin=await Product.find({username});
        if(!signin){
            return res.status(404).json({message:'Cannot Find account with username ${username}'})
            }
        res.status(200).json(signin)
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})
//Signin
app.post('/signin',async(req,res)=>{
    try {
        const signin=await Product.create(req.body)
        res.status(200).json(signin);
        
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message}) 
    }
})

//homepage


mongoose.connect('mongodb+srv://GetPass:getpass@getpass.wlzryhy.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    app.listen(port,()=>{
        console.log('Connected to MongoDB')
        console.log('Node API is running.')
    }) 
})
.catch(()=>{
    console.error('Didnt connect to Mongo DB')
})

const razorpay = new Razorpay({
    key_id: 'rzp_test_dsqpBlsd93gkpG',
    key_secret: 'TELsj1NBPn6xmgqtFqyM9tAn',
  });

  app.post('/create-order', async (req, res) => {
    try {
      const options = {
        amount: 1000, // Amount in paise (e.g., 1000 paise = Rs. 10)
        currency: 'INR',
        // receipt: 'order_receipt', // Generate a unique order receipt ID
      };
  
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create payment order' });
    }
  });

  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });

