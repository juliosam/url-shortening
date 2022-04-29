const shortener = document.querySelector('.shortener');
const linkCards = document.querySelector('.links-shorted__list')
const smallDirForm = document.querySelector('.smallDir-form')

const arrayObjects = JSON.parse(localStorage.getItem('item')) || [];


const requestCard = function(e){ 
    e.preventDefault();
    const bigDir = (this.querySelector('[class=shortener__input]')).value;
    
         fetch(`https://api.shrtco.de/v2/shorten?url=${bigDir}`)
        .then(res => res.json())
        .then(data => {
            const objDir = { bigDir, smallDir:data.result.short_link , copied: false};
            arrayObjects.push(objDir);
            //localStorage.arrayObjects()     ME QUEDE AQUI
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
              <form >                             //class="smallDir-form"
                <span >${card.smallDir}</span>
                <input type="submit" value= "Copy" >
              </form>
          </section>
        </li>
    `}).join('');
}

const copyLink = function(){
   e.preventDefault();
 console.log('copied')
 }

shortener.addEventListener('submit',requestCard)
window.addEventListener('load',localCards)

linkCards.addEventListener('submit', copyLink)

