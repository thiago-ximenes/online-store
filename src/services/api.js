export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const awaitRequest = await response.json();
  return awaitRequest;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
