import { baseUrl } from "./config.js"

let productCards = document.querySelector(".product__cards")

let all = ''
let s = 'All'
const getAllProducts = ()=>{
    productCards.innerHTML = ""
    fetch(`${baseUrl}cards?`+ `${all.length ? '' : "_limit=3"}${s == 'All' ? '' : "category="+s}`)
    .then(res=> res.json())
    .then((res)=> {
        res.map((item)=>{
             productCards.innerHTML +=`
                   <div class="product__card">
                        <img src="${item.image}" alt="Airpods">
                        <p class="product__card-title">${item.title}</p>
                        <p class="product__card-price">${item.price}$</p>
                        <button data-id=${item.id} class="product__btn btn__delete">Delete</button>
                    </div>  
        ` 
        })
        let btnDelete = document.querySelectorAll('.btn__delete')
        Array.from(btnDelete).map((item)=>{
            item.addEventListener('click' , ()=>{
                fetch(`${baseUrl}cards/${item.dataset.id}` , {
                    method:'DELETE'
                }).then((res)=> alert('Delete'))
                .catch((err)=>alert(err))
            })
        })
      
    })
}
getAllProducts()

let modalClose = document.querySelector(".modal__close")
let modal = document.querySelector(".modal")
let btn = document.querySelector(".create")
btn.addEventListener('click', ()=>{
    modal.classList.add("show")
    document.body.style.overflow = 'hidden'
})

modalClose.addEventListener('click', ()=>{
    modal.classList.remove("show")
    document.body.style.overflow = ''
})
// document.addEventListener('keydown', (e)=>{
//     console.log(e);
//     e.code === "Escape"
// })

let form = document.querySelector('form')
form.addEventListener('submit' , (e)=>{
     console.log(e);
     e.preventDefault()
     fetch(`${baseUrl}cards`, {
        method:"POST",
        headers : {
            "Content-type":"application/json"
        },
        body:JSON.stringify(
            {
               title:e.target[0].value,     
               price:e.target[1].value,     
               memory:e.target[2].value,     
               image:e.target[3].value,     
               category:e.target[4].value,     
            }
        )
     })
     .then((res)=> alert('успешно'))
     .catch((err)=> alert(err))
})
// see al
let seeAll = document.querySelector('.see__al')
seeAll.addEventListener('click',()=>{
    if(seeAll.textContent === 'See all>'){
        seeAll.textContent = 'Hide<'
        all = 'all'
        getAllProducts()
    }else{
        seeAll.textContent = 'See all>'
        all = ''
        getAllProducts()
    }
})

let cardCategory = document.querySelectorAll('.product__category')
Array.from(cardCategory).map((item)=>{
    item.addEventListener('click', ()=>{
        s = item.textContent
        getAllProducts()
    })
})