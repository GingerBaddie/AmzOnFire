export const cart = [];

export function addToCart(productId, selectedQuantity) {
         let matchingItem;
            cart.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                  matchingItem = cartItem;
            }
        });

           if (matchingItem) {
                    matchingItem.quantity += Number(selectedQuantity);
                }

                else {
                     cart.push({
                productId: productId,
                quantity: Number(selectedQuantity)
              }) ;
                }
}
