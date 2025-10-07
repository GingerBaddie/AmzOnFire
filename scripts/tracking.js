import { calculateCartQuantity } from "../data/cart.js";
import { loadProductsFetch } from "../data/products.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { orders } from "../data/orders.js";

document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

console.log(orders);


loadProductsFetch().then(()=> {
    
   renderTracking();
    })


function renderTracking() {

    let matchingProduct;
    let matchingOrder;
    let matchingFromParray;
    const url = new URL(window.location.href)
      const orderURLid = (url.searchParams.get('orderId'));
      const productURLid = (url.searchParams.get('productId'));

    orders.forEach((order) => {
        if(order.id === orderURLid) {
            matchingOrder = order;
            (order.products).forEach((product) => {
                if(product.productId === productURLid) {
                    matchingProduct = product;
                }

            products.forEach((pArrayDuct) => {
            if(pArrayDuct.id === productURLid) {
                matchingFromParray = pArrayDuct;
            }
        });

            });
        }

        
    });

      document.querySelector('.js-order-tracking').innerHTML = 
    `
     <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(matchingProduct.estimatedDeliveryTime).format('MMMM DD')}
          
        </div>

        <div class="product-info">
          ${matchingFromParray.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${matchingFromParray.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>

    `

    const now = dayjs();
    const orderTime = dayjs(matchingOrder.orderTime);
    const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);

    let percentProgress =
    (now.diff(orderTime) / deliveryTime.diff(orderTime)) * 100;

    // Keep between 0–100
    percentProgress = Math.min(Math.max(percentProgress, 0), 100);
    console.log(percentProgress);

   
    const progressBar = document.querySelector(".progress-bar");
    setTimeout(() => {
            progressBar.style.width = `${percentProgress}%`;
        }, 100); 

    const statusLabels = document.querySelectorAll('.progress-label');

    if (percentProgress < 50) {
        statusLabels[0].classList.add('current-status');  // Preparing
        } else if (percentProgress < 100) {
        statusLabels[1].classList.add('current-status');  // Shipped
            } else {
            statusLabels[2].classList.add('current-status');  // Delivered
            }
   
  
    }

