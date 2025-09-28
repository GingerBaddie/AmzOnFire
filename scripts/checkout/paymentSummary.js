import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";



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

          <button class="place-order-button button-primary">
            Place your order
          </button>
              
        `


    document.querySelector(".js-payment-summary").innerHTML = paymentHtml;

    


}