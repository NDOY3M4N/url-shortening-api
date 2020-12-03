// All the code relative to displaying/hiding the navbar
const menu = document.querySelector('.navbar__menu')
const navbarLinks = document.querySelector('.navbar__links')

menu.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  document.body.classList.toggle('overflow')
})
