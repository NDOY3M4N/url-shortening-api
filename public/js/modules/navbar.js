/**
 * Module for showing/hiding the navbar
 * 
 * @module navbar
 */
const menu = document.querySelector('.navbar__menu')
const navbarLinks = document.querySelector('.navbar__links')

menu.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  menu.classList.toggle('active')
  document.body.classList.toggle('overflow')
})
