import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
    let amount = 0;
    let totalAmount = 0;
    let ItemCount = 0;
    let shippingPrice = 0;
    
    let calculatedTax = 0;
    cart.forEach( (cartItem) => {
        
        let currentItemId;
        let currentItemDeliveryId;
        currentItemId = cartItem.productId;
        currentItemDeliveryId = cartItem.deliveryOptionId;
        ItemCount += cartItem.quantity;

        products.forEach((product) => {
           if(product.id === currentItemId) {
            amount += ((product.priceCents) * cartItem.quantity);
            
            
        }
        
    });
        deliveryOptions.forEach((option)=> {
            if(option.id === currentItemDeliveryId) {
                shippingPrice += option.priceCents;
            }
        });

        });

        calculatedTax = (amount * 0.1); 
        totalAmount = (calculatedTax + shippingPrice + amount);
        
        
      let paymentHtml = 
        `
        
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${ItemCount}): </div>
            <div class="payment-summary-money">$${formatCurrency(amount)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(amount + shippingPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(calculatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAmount)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
              
        `


    document.querySelector(".js-payment-summary")
    .innerHTML = paymentHtml;

        
    document.querySelector(".js-place-order")
    .addEventListener('click', async () => {
      try {
          const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });

      const order = await response.json();
      
      
      addOrder(order);
    
      
      }

      catch(error) {
        console.log('Unexpected error, Try again later.');
        
      }
    
      window.location.href = 'orders.html';
    }); 

}