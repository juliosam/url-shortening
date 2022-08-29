const shortener = document.querySelector('.shortener');
const linkCards = document.querySelector('.links-shorted__list');
const menuMobile = document.querySelector('.navbar__menus-container');
const burgerIcon = document.querySelector('.navbar__menu-icon');

const arrayObjects = JSON.parse(localStorage.getItem('item')) || [];

const requestCard = function(e){ 
  e.preventDefault();
  const bigDir = (this.querySelector('[class=shortener__input]')).value;
    
   fetch(`https://api.shrtco.de/v2/shorten?url=${bigDir}`)
  .then(res => res.json())
  .then(data => {
    const objDir = { bigDir, smallDir:data.result.short_link , copied: false};
    arrayObjects.push(objDir);
    this.reset();
    linkCards.innerHTML = arrayObjects.map((card, i)=>{
      return `
        <li>
          <section>
            <span>${card.bigDir}</span>
            <form class="smallDir-form">
              <span >${card.smallDir}</span>
              <input type="submit" value= "Copy" >
            </form>
          </section>
        </li>
      `}).join('');
    localStorage.setItem("item",JSON.stringify(arrayObjects))
  })
    console.log(arrayObjects)
} 

const localCards = function(){
  linkCards.innerHTML = arrayObjects.map((card, i)=>{
    return `
      <li>
        <section>
          <span>${card.bigDir}</span>
          <form class="smallDir-form">                             
            <span class="span-dir">${card.smallDir}</span>
            <input type="submit" value= "Copy" >
          </form>
        </section>
      </li>
    `}).join('');
}

const copyLink = function(e){
   e.preventDefault();
   if(e.target.className === 'smallDir-form'){
     const littleLink = e.target.firstChild.nextElementSibling.innerHTML;
     console.log(littleLink);

     let inputElement = document.createElement('input');
     inputElement.setAttribute('value', littleLink);
     document.body.appendChild(inputElement);
     inputElement.select();
     document.execCommand("copy");
     inputElement.parentNode.removeChild(inputElement);
     e.target.lastChild.previousElementSibling.value = "Copied!"
     e.target.lastChild.previousElementSibling.style.background = "rgb(8, 8, 63)";
    }
 }

shortener.addEventListener('submit',requestCard)
window.addEventListener('load',localCards)

linkCards.addEventListener('submit', copyLink)

const movileMenuHandle = function(){

  if(menuMobile.classList.contains('burger-pressed')){
    menuMobile.classList.remove('burger-pressed')
  }
  else {menuMobile.classList.add('burger-pressed')}
}

burgerIcon.addEventListener('click', movileMenuHandle)

