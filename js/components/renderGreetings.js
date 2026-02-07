import {hideGreetingSections } from "./uiHelpers.js";

export function renderQuestionHTML ()  {
 let question = document.querySelector('.greetings');
 let searchBar = document.querySelector ('.js-search-data');

 searchBar.classList.add('not-clickable');

 question.innerHTML = 
 `
 <p class = "question"> Ano ang iyong pangalan? </p>
 <input type ="text" class = "answer" placeholder = "Your name here..."> 
 <button class = "submit-btn" value = "submit"> Submit</submit>
 `
 
 let input = document.querySelector('.answer');
 let button = document.querySelector('.submit-btn');
 
 input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {

    const name = input.value.trim() || 'Kababayan'
    renderGreetingsHTML(name);
  }
});

  button.addEventListener('click', () => {
    const name = input.value.trim() || 'Kababayan'
    renderGreetingsHTML(name);
  
});

}


function renderGreetingsHTML (name) {
  
  let greetings = document.querySelector('.greetings');

   let searchBar = document.querySelector ('.js-search-data');

  greetings.innerHTML = `
   
  <h1 class = "greeting-title"> Magandang araw, ${name}!</h1>
  <p class = "greeting-text" >Alamin ang lagay
  ng ArawMo!</p>
  <button class = "go-btn">Search Now!</button>
  `;

  let button = document.querySelector('.go-btn');

  button.addEventListener('click', () => {
    hideGreetingSections();
    searchBar.classList.remove('not-clickable');
  });
}
