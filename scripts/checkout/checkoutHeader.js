import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
    const checkoutCount = document.querySelector(".js-checkout-count");
    checkoutCount.innerHTML =  `${calculateCartQuantity()} items`;
}