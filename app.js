'use strict';

const searchWord = document.querySelector('#searchWord');
const msg = document.querySelector('#msg');
const cont = document.querySelector('#word');
const sword = cont.children[0];
const type = cont.children[1];
const meaning = document.querySelector('#meaning span');
const example = document.querySelector('#example span');
const synonyms = document.querySelector('#synonyms span');
const hide = document.querySelector('.hide');
const sound = document.querySelector('#sound');
let sun;



function fetchApi(word) {
    msg.innerHTML = 'Loading...';

    // hide.style.display = 'none';
    hide.classList.remove('active');
    
    let api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // console.log(api);
    fetch(api).then(res => res.json()).then(result => data(result, word));
}

function data(result, word) {
    // msg.innerHTML = `${result.message}`;
    if (result.title === 'No Definitions Found') {
        msg.innerHTML = `${result.title}`;
        sword.innerHTML = '';
        type.innerHTML = '';
        meaning.innerHTML = '';
        example.innerHTML = '';
        synonyms.innerHTML = '';
    } else {

        // hide.style.display = 'block';
        hide.classList.add('active');        
        msg.innerHTML = '';
        console.log(result);
        // console.log(result[0].word);
        sword.innerHTML = result[0].word;
        type.textContent = result[0].meanings[0].partOfSpeech + "  " + result[0].phonetics[0].text; 
        // console.log(result[0].meanings[0].definitions[0].definition);
        meaning.innerHTML = result[0].meanings[0].definitions[0].definition;
        // console.log(result) 
        if (result[0].meanings[0].definitions[0].example === undefined) {
            example.innerHTML = "No Example Found";
        } else {
            example.innerHTML = result[0].meanings[0].definitions[0].example;
        }
        if (result[0].meanings[0].synonyms[0] === undefined) {
            synonyms.innerHTML = "No Synonyms Found";
        } 
        else {
            let syn = result[0].meanings[0].synonyms;
            let str = "";
            for (let i = 0; i < 5; i++) {
                str += syn[i] + ", ";
            }
            synonyms.innerHTML = str;
        }
        sun = new Audio(result[0].phonetics[0].audio);
    }
}

sound.addEventListener('click', () => {
    sun.play();
})

searchWord.addEventListener('keyup', (e) => {
    if (searchWord.value !== "" && e.keyCode === 13) {
        fetchApi(searchWord.value);
    } else if (searchWord.value === "") {
        msg.innerHTML = 'Please Enter a Word';

        // hide.style.display = 'none';
        hide.classList.remove('active');
    }
})

document.querySelector('.clear').addEventListener('click', () => {
    searchWord.value = "";
    msg.innerHTML = 'Please Enter a Word';
    
    // hide.style.display = 'none';
    hide.classList.remove('active');
    
    sword.innerHTML = '';
    type.innerHTML = '';
    meaning.innerHTML = '';
    example.innerHTML = '';
    synonyms.innerHTML = '';
})
