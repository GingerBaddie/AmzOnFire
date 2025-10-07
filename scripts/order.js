import { calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";


document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

loadProductsFetch().then(()=> {

  renderOrder();
})

function renderOrder() {

  orders.forEach((order) => {

  const deliveryDate = dayjs(order.orderTime).format('MMMM D');
  console.log(deliveryDate);
  const priceCents = Number(order.totalCostCents);
  
  let productDetailsHTML = ``;
  
  function productDetailsHTMLfun() {
      let matchingProduct;

       

        (order.products).forEach((product) => {
        
        
        products.forEach((pArrayDuct) => {
          
        if(pArrayDuct.id === product.productId) {
            matchingProduct = pArrayDuct;
            
            
        }         

      })

      productDetailsHTML += `
        <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
                
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button"
              data-product-id = "${matchingProduct.id}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `
      
    })

  

    return productDetailsHTML;

  
  
 

    }
    

document.querySelector('.js-order-grid').innerHTML += 
    `
      <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${deliveryDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(priceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            
         ${productDetailsHTMLfun()}

          </div>
        </div>
    `
    
});


document.querySelectorAll('.js-buy-again-button')
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
     addToCart(productId, 1);
     document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
     
    });
  });



}
