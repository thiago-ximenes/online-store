export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const awaitRequest = await response.json();
  return awaitRequest;
}

export async function getProductsFromCategoryAndQuery(idCategory, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${idCategory}&q=${query}`);
  const awaitRequest = await response.json();
  return awaitRequest;
}

export async function getProductById(idProduct) {
  const response = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
  const awaitRequest = await response.json();
  return awaitRequest;
}
