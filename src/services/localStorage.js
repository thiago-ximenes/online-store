export function saveToLocalStorage(productId) {
  return localStorage
    .setItem('cartItems', productId);
}

export function getFromLocalStorage() {
  return localStorage
    .getItem('cartItems');
}

export function tryToGet(product) {
  let arrayOfLocalStorage = [];
  const obj = {
    price: product.price,
    id: product.id,
    img: product.thumbnail,
    name: product.title,
    quantity: 1,
  };
  let productsBought;
  if (getFromLocalStorage()) {
    arrayOfLocalStorage = JSON.parse(getFromLocalStorage());
    productsBought = arrayOfLocalStorage
      .find((item) => item.id === product.id);
  }
  if (!productsBought) {
    arrayOfLocalStorage.push(obj);
  } else {
    productsBought.quantity += 1;
  }
  saveToLocalStorage(JSON.stringify(arrayOfLocalStorage));
}
