// Функції для роботи з бекендом

import axios from 'axios';

export const getCategories = async () => {
  const { data } = await axios('https://dummyjson.com/products/categories');
  return data;
};

//
export const getProducts = async (page = 1, limit = 12) => {
    const skip = (page - 1) * limit;
     const { data } = await axios(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return data.products;
};

export const getProductsByCategory = async (category, page = 1, limit = 12) => {
    const skip = (page - 1) * limit;
    const { data } = await axios (`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`);
    return data.products;
};

export const getProductById = async id => {
    const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
};

export const searchProducts = async query => {
    const { data } = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    return data.products;
  };