export function saveToLocalStorage(productId) {
  localStorage
    .setItem('cartItems', productId);
}

export function getFromLocalStorage() {
  localStorage
    .getItem('cartItems');
}
