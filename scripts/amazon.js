let productsHTML = ``;
products.forEach((product) => {
        productsHTML += 
        `<div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src= "${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select >
                <option selected value="1" data-product-quantity = "${product.quantity}">1</option>
                <option value="2" data-product-quantity = "${product.quantity}">2</option>
                <option value="3" data-product-quantity = "${product.quantity}">3</option>
                <option value="4" data-product-quantity = "${product.quantity}">4</option>
                <option value="5" data-product-quantity = "${product.quantity}">5</option>
                <option value="6"data-product-quantity = "${product.quantity}">6</option>
                <option value="7"data-product-quantity = "${product.quantity}">7</option>
                <option value="8"data-product-quantity = "${product.quantity}">8</option>
                <option value="9"data-product-quantity = "${product.quantity}">9</option>
                <option value="10"data-product-quantity = "${product.quantity}">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
                Add to Cart
            </button>
            </div>`
        });
        
        

document.querySelector('.js-products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {
            button.addEventListener('click', () => {
            const productId = (button.dataset.productId);
            let matchingItem;
            cart.forEach((item) => {
                if (item.productId === productId) {
                  matchingItem = item;
            }
        });

           if (matchingItem) {
                    matchingItem.quantity += 1;
                }

                else {
                     cart.push({
                productId: productId,
                quantity: 1
              }) ;
                }
                
                console.log(cart);
});
        });