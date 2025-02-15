import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import orderModel from '../models/orderModel.js';
const router = express.Router();




const MERCHANT_KEY = process.env.MERCHANT_KEY
const MERCHANT_ID = process.env.MERCHANT_ID

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const MERCHANT_BASE_URL = process.env.MERCHANT_BASE_URL
const MERCHANT_STATUS_URL = process.env.MERCHANT_STATUS_URL

const redirectUrl = process.env.redirectUrl

const successUrl = "http://localhost:3000/dashboard/Order-success"
const failureUrl = "http://localhost:3000/"

const ordersStore = {};
router.post('/create-order', async (req, res) => {

    const { name, mobileNumber, amount, products, id } = req.body;

    const orderId = uuidv4()
    console.log(products);
    console.log(id);


    ordersStore[orderId] = {

        products,
        id,
        payment: "pending"

    };
    console.log("order store is", ordersStore)
    //payment
    const paymentPayload = {
        merchantId: MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount: amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    }

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string = payload + '/pg/v1/pay' + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url: MERCHANT_BASE_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payload,

        }

    }
    try {

        const response = await axios.request(option);
        console.log(response.data.data.instrumentResponse.redirectInfo.url)
        res.status(200).json({ msg: "OK", url: response.data.data.instrumentResponse.redirectInfo.url })
    } catch (error) {
        console.log("error in payment", error)
        res.status(500).json({ error: 'Failed to initiate payment' })
    }

});

router.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;


    // Further processing...
    const keyIndex = 1
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const order = ordersStore[merchantTransactionId];
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }


    const option = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    }

    axios.request(option).then((response) => {
        if (response.data.success === true) {
            order.status = 'Success';
            const orderData = new orderModel({
                products: order.products,  // Assuming the products are stored in the order object
                payment: 'Success',  // You can replace this with actual payment status if needed
                buyer: order.id,  // Replace with appropriate buyer ID or name
            });
            orderData.save()
                .then(() => {
                    console.log('Order saved successfully');
                    // Clear the order from the ordersStore after saving to the database
                    delete ordersStore[merchantTransactionId];
                    // Redirect to success URL
                    return res.redirect(successUrl);
                })
                .catch((error) => {
                    console.log('Error saving order:', error);
                    return res.redirect(failureUrl);
                });
        } else {
            order.status = 'Failed';
            delete ordersStore[merchantTransactionId];
            return res.redirect(failureUrl);

        }

    })
});


export default router;




