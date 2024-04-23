import { instructions } from "./data/instructions.js";
import { reviews } from "./data/reviews.js";
import { faqs } from "./data/faqs.js";
import { surveys } from './data/surveys.js';

const instructionsContainer = document.querySelector('.instructions__content');
const reviewsContainer = document.querySelector('.swiper-wrapper');
const faqContainer = document.querySelector('.faq__content');
const surveyContainer = document.querySelector('.survey__wrapper');

function insertInstructionsTemplate({ image, title, text }) {
  const instructionsTemplate = `
    <div class="instructions__card">
      <img src="${image}" alt="">
      <p>${title}</p>
      <p>${text}</p>
    </div>
  `;

  instructionsContainer.insertAdjacentHTML('beforeend', instructionsTemplate);
}

function insertReviewTemplate({ username, city, avatar, reviewText }) {
  const reviewTemplate = `
    <div class="swiper-slide">
      <div class="reviews__card">
        <img src="${avatar}" alt="">
        <p>${username}</p>
        <p>${city}</p>
      </div>
      <p>${reviewText}</p>
    </div>
  `;

  reviewsContainer.insertAdjacentHTML('beforeend', reviewTemplate);
}

function insertFaqTemplate({ title, text }) {
  const faqTemplate = `
    <details>
      <summary>
        <span>${title}</span>
        <span>+</span>
      </summary>
      <p>${text}</p>
    </details>
  `;

  faqContainer.insertAdjacentHTML('beforeend', faqTemplate);
}

function insertSurveyTemplate({ title, text }) {
  const surveyTemplate = `
    <div class="survey__card">
      <p>${title}</p>
      <p>${text}</p>
    </div>
  `;

  surveyContainer.insertAdjacentHTML('beforeend', surveyTemplate);
}

instructions.forEach(review => insertInstructionsTemplate(review));
reviews.forEach(review => insertReviewTemplate(review));
faqs.forEach(faq => insertFaqTemplate(faq));
surveys.forEach(survey => insertSurveyTemplate(survey));