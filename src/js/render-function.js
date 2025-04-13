//Функцію для створення, рендеру або видалення розмітки

export const renderCategories = (filters, refs) => {
    const markup = filters
      .map(filter => {
        return `<li class="categories__item">
   <button class="categories__btn" type="button">${filter}</button>
  </li>`;
      })
      .join('');
    refs.categoriesList.innerHTML = markup;
  };

  //
export const renderProducts = (products, container) => {
    const markupP = products.map(product => `
      <li class="products__item" data-id="${product.id}">
        <img class="products__image" src="${product.thumbnail}" alt="${product.title}" />
        <p class="products__title">${product.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${product.brand}</p>
        <p class="products__category">Category: ${product.category}</p>
        <p class="products__price">Price: $${product.price}</p>
      </li>
    `).join('');
    container.innerHTML = markupP;
};

export const renderModalProduct = (product, container) => {
    const tags = `
      <li>Brand: ${product.brand}</li>
      <li>Category: ${product.category}</li>
      <li>Rating: ${product.rating}</li>
    `;
  
    container.innerHTML = `
      <img class="modal-product__img" src="${product.thumbnail}" alt="${product.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${product.description}</p>
        <p class="modal-product__shipping-information">Shipping: Worldwide</p>
        <p class="modal-product__return-policy">Return Policy: 30 days</p>
        <p class="modal-product__price">Price: $${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
    `;
};