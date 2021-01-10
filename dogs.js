const BREEDS_URL   = "https://dog.ceo/api/breeds/list/all";
const DOG_URL_BASE = "https://dog.ceo/api/breed/selectedBreed/images/random"

let dogImageURL   = null;
let selectedBreed = null;
let buttonActive  = false;
let breeds_list   = [];
let dogPhotoURL   = [];
let fetchSuccess  = true;

// DOM //
const SELECT_LIST = document.querySelector('.select-css');
const FORM_BUTTON = document.querySelector('.app-menu button');
const APP_DISPLAY = document.querySelector('.app-display');

// FUNCTIONS //

function getBreedList() {
  const promise = fetch(BREEDS_URL);

  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      fetchedList = processedResponse.message;
      fetchedListCleaned = [];
      
      for (breed in fetchedList) {fetchedListCleaned.push(breed)};
      breeds_list = fetchedListCleaned;
    })
    .then(function() {
      rerenderBreedList();
    })
};

function selectBreed(breed) {
  if (breed !== "default") {
    selectedBreed = breed;
    rerenderButton();
  }
}

function getDog() {
  const DOG_URL = DOG_URL_BASE.replace('selectedBreed', selectedBreed);
  const promise = fetch(DOG_URL);

  promise
    .then(function(response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function(processedResponse) {
      dogImageURL = processedResponse.message;
    })
    .then(function() {
      rerenderDogImage();
    })
}

function rerenderDogImage() {
  const imgTemplate = `<img src="${dogImageURL}" alt="A doggy doing something!">`
  APP_DISPLAY.innerHTML = imgTemplate;
}

function rerenderBreedList() {
  // Select list //
  if (breeds_list.length) {
    breeds_list.forEach(function(breed){
      let optionTemplate = `<option value="${breed}">${breed}</option>`
      SELECT_LIST.innerHTML += optionTemplate;
    })
  }
}

function rerenderAll() {
  rerenderBreedList();
  rerenderButton();
}

function rerenderButton() {
  // Form button //
  if (selectedBreed) {FORM_BUTTON.disabled = false;} else {FORM_BUTTON.disabled = true;}
}

function init() {
  rerenderAll();
  getBreedList();

  SELECT_LIST.addEventListener('change', function(event) {
    selectBreed(SELECT_LIST.value);
  });

  FORM_BUTTON.addEventListener('click', function(event) {
    if (!FORM_BUTTON.disabled) {
      getDog();
    }
  })
}

// START APP //
init();
