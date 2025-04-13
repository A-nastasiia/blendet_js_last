//Логіка сторінки Home
import { getCategories, getProducts, getProductsByCategory, getProductById, searchProducts} from './js/products-api';
import { refs } from './js/refs';
import { renderCategories, renderProducts, renderModalProduct} from './js/render-function';
import { openModal, closeModal } from './js/modal';

//
let currentPage = 1;
let selectedCategory = 'All';
const PRODUCTS_PER_PAGE = 12;

const init = async () => {
  try {
    const categoriesData = await getCategories();
    const categories = categoriesData.map(({ name }) => name);
    const filters = ['All', ...categories];
    renderCategories(filters, refs);
  } catch (error) {
    console.log(error);
  }
};

//
const loadProducts = async () => {
    try {
      refs.notFound.classList.remove('not-found--visible');
  
      const products = selectedCategory === 'All'
        ? await getProducts(currentPage, PRODUCTS_PER_PAGE)
        : await getProductsByCategory(selectedCategory, currentPage, PRODUCTS_PER_PAGE);
  
      if (!products.length) {
        refs.productsList.innerHTML = '';
        refs.notFound.classList.add('not-found--visible');
        return;
      }
  
      renderProducts(products, refs.productsList);
    } catch (error) {
      console.log('Error loading products:', error);
    }
};
  
const onCategoryClick = e => {
    const btn = e.target.closest('button.categories__btn');
    if (!btn) return;

    const buttons = refs.categoriesList.querySelectorAll('.categories__btn');
    buttons.forEach(b => b.classList.remove('categories__btn--active'));
    btn.classList.add('categories__btn--active');
  
    selectedCategory = btn.textContent.trim();
    currentPage = 1;
  
    loadProducts();
};
  
const addListeners = () => {
    refs.categoriesList.addEventListener('click', onCategoryClick);
};
  
init();

refs.productsList.addEventListener('click', async e => {
    const item = e.target.closest('li.products__item');
    if (!item) return;
  
    const productId = item.dataset.id;
    try {
      const product = await getProductById(productId);
      renderModalProduct(product, refs.modalProductContainer);
      openModal();
    } catch (error) {
      console.error('Failed to open modal:', error);
    }
});
  
document.querySelector('.modal').addEventListener('click', e => {
    if (e.target.classList.contains('modal') || e.target.closest('.modal__close')) {
      closeModal();
    }
});

refs.searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const query = refs.searchInput.value.trim();
  
    if (!query) return;
  
    try {
      const products = await searchProducts(query);
  
      if (!products.length) {
        refs.productsList.innerHTML = '';
        refs.notFound.classList.add('not-found--visible');
        return;
      }
  
      refs.notFound.classList.remove('not-found--visible');
      renderProducts(products, refs.productsList);
    } catch (error) {
      console.error('Search error:', error);
    }
});
  
refs.searchClearBtn.addEventListener('click', async () => {
    refs.searchInput.value = '';
    try {
      const products = await getProducts(1, PRODUCTS_PER_PAGE);
      refs.notFound.classList.remove('not-found--visible');
      renderProducts(products, refs.productsList);
    } catch (error) {
      console.error('Clear search failed:', error);
    }
});