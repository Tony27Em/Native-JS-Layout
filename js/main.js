import './swiper';
import './templates';
import '../styles/css/style.css';

// SHOW/HIDE "SCROLL-TO-TOP" BUTTON
function scrollToTop() {
  if (window.scrollY >= 200) {  
    return toTopButton.style.bottom = '30px';
  }
  return toTopButton.style.bottom = '-100px';
}

// SCROLL TO TOP
const toTopButton = document.querySelector('.scroll-to-top');
toTopButton.addEventListener('click', () => window.scrollTo({ top: 0 }));

// TOGGLE DESKTOP/BURGER MENU
const menu = document.getElementById('menu');
const mobileLogo = document.querySelector('.header__menu-mobile__logo');
const openBurgerButton = document.querySelector('.header__burger-btn');
const closeBurgerButton = document.querySelector('.header__menu-mobile__close');

function openMobileMenu() {
  menu.style.display = 'flex';
  
  const timeout = setTimeout(() => {
    menu.style.transition = '0.2s ease-out';
    menu.style.transform = 'translateX(0)';
    clearTimeout(timeout);
  }, 0);
}

function closeMobileMenu() {
  menu.style.transition = '0.2s ease-out';
  menu.style.transform = 'translateX(100%)';

  const timeout = setTimeout(() => {
    menu.style.display = 'none';
    clearTimeout(timeout);
  }, 200);
}

function toggleMenuType() {
  if (window.innerWidth <= 768) {
    menu.classList.add('header__menu-mobile');
    menu.classList.remove('header__menu-desktop');
    menu.style.transform = 'translateX(100%)';
    mobileLogo.style.display = 'flex';
    openBurgerButton.style.display = 'flex';
  } else {
    menu.classList.add('header__menu-desktop');
    menu.classList.remove('header__menu-mobile');
    menu.style.display = 'flex';
    menu.style.transform = 'translateX(0)';
    mobileLogo.style.display = 'none';
    openBurgerButton.style.display = 'none';
  }
  menu.style.transition = '0s';
}

openBurgerButton.addEventListener('click', openMobileMenu);
closeBurgerButton.addEventListener('click', closeMobileMenu);
document.addEventListener('DOMContentLoaded', toggleMenuType);
window.addEventListener('resize', toggleMenuType);
window.addEventListener('scroll', () => {
  scrollToTop();

  if (window.innerWidth <= 768) {
    closeMobileMenu();
  }
})

// FORM
const form = document.getElementById('form'),
      usernameInput = document.getElementById('username'),
      usernameWarningMessage = document.getElementById('username-warning'),
      usernameCheckIcon = document.getElementById('username-check-icon');
const phoneInput = document.getElementById('phone'),
      phoneWarningMessage = document.getElementById('phone-warning'),
      phoneCheckIcon = document.getElementById('phone-check-icon'),
      phoneRegex = /^[\d+()-]+$/;
const checkboxInput = document.getElementById('checkbox');
const submitButton = document.getElementById('submit-btn');
let timeout;
let isValid = {
  'username': false,
  'phone': false,
};

function hideValidationIcon(input, message, icon, type) {
  input.value = '';
  input.style.boxShadow = '';
  message.style.display = 'none';
  icon.style.display = 'none';
  return isValid[type] = false;
}

function showErrorIcon(input, message, icon, type) {
  input.style.boxShadow = 'inset 0 0 0 2px #F13636';
  message.style.display = 'block';
  icon.style.display = 'block';
  icon.src= './images/error.png';
  return isValid[type] = false;
}

function showOkIcon(input, message, icon, type) {
  input.style.boxShadow = 'inset 0 0 0 2px #C2C8CD';
  message.style.display = 'none';
  icon.style.display = 'block';
  icon.src= './images/ok.png';
  return isValid[type] = true;
}

function checkInput(e, input, message, icon, type) {
  clearTimeout(timeout);
  const value = e.target.value;

  timeout = setTimeout(() => {
    if (!value) {
      return hideValidationIcon(input, message, icon, type);
    }
    
    if (
      type === 'username' && value && value.trim().length < 3 ||
      type === 'phone' && !phoneRegex.test(value)
    ) {
      return showErrorIcon(input, message, icon, type);
    } 

    return showOkIcon(input, message, icon, type);
  }, 300)  
}

async function sendFormData(e) {
  e.preventDefault();  

  if (Object.values(isValid).includes(false)) return;

  const body = JSON.stringify({
    username: usernameInput.value.trim(),
    phone: phoneInput.value.trim(),
    agreement: checkboxInput.value === 'on',
  })

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body,
    });

    const data = await response.json();
    console.log('Данные успешно отправлены', data);

    hideValidationIcon(usernameInput, usernameWarningMessage, usernameCheckIcon, 'username');
    hideValidationIcon(phoneInput, phoneWarningMessage, phoneCheckIcon, 'phone');
    checkboxInput.checked = false;
  } catch (err) {
    console.log('УПС, ошибка! : ', err);
  }
}

usernameInput.addEventListener('input', (e) => checkInput(e, usernameInput, usernameWarningMessage, usernameCheckIcon, 'username'));
phoneInput.addEventListener('input', (e) => checkInput(e, phoneInput, phoneWarningMessage, phoneCheckIcon, 'phone'));
form.addEventListener('submit', (e) => sendFormData(e));