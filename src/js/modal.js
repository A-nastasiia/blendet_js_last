//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

export const openModal = () => {
    document.querySelector('.modal').classList.add('modal--is-open');
};
  
export const closeModal = () => {
    document.querySelector('.modal').classList.remove('modal--is-open');
};