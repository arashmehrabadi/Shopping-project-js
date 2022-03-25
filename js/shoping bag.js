let courserList = document.querySelector('.courser')
// let topRateList = document.querySelector('.coursers')
let iconBasketResult = document.querySelector('.icon-basket-result .top')
let iconBasketResultPrice = document.querySelector('.icon-basket-result .down')
console.log(iconBasketResultPrice.parentElement);
let basketShoppingDiv = document.querySelector('.show-hide')

let addToShoppingCart = document.querySelector('.basket-icone')
let courserCounterDiv = document.querySelector('.basket-shopping span')




let products = document.querySelectorAll('.product')
let stars = document.querySelectorAll(".product .fa-solid.fa-star");
let rates = document.querySelectorAll('.rate')




let iconFavResult = document.querySelector('.icon-fav-result .top')
let favCounterDiv = document.querySelector('.fav-shopping  span')
let favShoppingDiv = document.querySelector('.hide-show')





let search = document.querySelector('.fa-magnifying-glass')
let searchInput = document.querySelector('#search')








class FavoritDiv {
    likeCourse(e) {
        if (e.classList.contains('fa-heart')) {
            let cart = e.parentElement.parentElement.parentElement.parentElement
            this.getCourseInfo(cart)
            // console.log(cart);
        }
    }
    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[1].getAttribute('data-id')
        }
        this.addToCart(course)
        this.saveToLocalStorage(course)
    }
    addToCart(cInfo) {
        shoppingCartDiv2(cInfo)
    }
    saveToLocalStorage(fav) {
        let favArray = getFromStorage2()
        favArray.push(fav)
        let strCourse = JSON.stringify(favArray)
        localStorage.setItem('fav', strCourse)
    }
    loadContentcart() {
        let courseLS = getFromStorage2()
        courseLS.forEach(cInfo => {
            shoppingCartDiv2(cInfo)
        });
    }
    removeDivShoppingCart(e) {
        if (e.classList.contains('remove-course')) {
            // console.log(e.classList);
            e.parentElement.parentElement.parentElement.remove()
            // course = e.parentElement.parentElement.parentElement
            let idCourse = e.getAttribute('data-id')
            this.removeFromLS(idCourse)
            this.favCounter()
        }
    }
    removeFromLS(id) {
        let courseLS = getFromStorage2()
        courseLS.forEach((course, index) => {
            if (course.id == id) {
                courseLS.splice(index, 1)
            }
        });
        localStorage.setItem('fav', JSON.stringify(courseLS))
        this.hideShowFavResultDiv()
        // console.log(id);
    }
    favCounter() {
        if (JSON.stringify(JSON.parse(localStorage.getItem('fav')).length) == 0) {
            favCounterDiv.classList.add('hidden')
        } else {
            favCounterDiv.classList.remove('hidden')
            favCounterDiv.innerHTML = JSON.stringify(JSON.parse(localStorage.getItem('fav')).length)
        }
    }
    hideShowFavResultDiv() {
        if (JSON.stringify(JSON.parse(localStorage.getItem('fav')).length) == 0) {
            // courserCounterDiv.classList.add('hidden')
            favShoppingDiv.classList.remove('fav-shopping')
        } else {
            // courserCounterDiv.classList.remove('hidden')
            favShoppingDiv.classList.add('fav-shopping')
            // courserCounterDiv.innerHTML = JSON.stringify(JSON.parse(localStorage.getItem('course')).length)
        }
    }
}





class Product {
    // buyCourse(e) {
    //     // e.preventDefault()
    //     if (e.classList.contains('basket-icone')) {
    //         let cart = e.parentElement.parentElement.parentElement.parentElement
    //         this.getCourseInfo(cart)
    //         // console.log(cart);
    //     }
    // }
    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[0].getAttribute('data-id')
        }

        // console.log(course.price);
        this.totalPrice(course)
        this.addToCart(course)
        this.saveToLocalStorage(course)
    }
    addToCart(cInfo) {
        shoppingCartDiv(cInfo)
    }
    saveToLocalStorage(course) {
        let courseArray = getFromStorage()
        courseArray.push(course)
        let strCourse = JSON.stringify(courseArray)
        localStorage.setItem('course', strCourse)

    }
    loadContentcart() {
        let courseLS = getFromStorage()
        courseLS.forEach(cInfo => {
            shoppingCartDiv(cInfo)
        });
    }
    removeDivShoppingCart(e) {
        if (e.classList.contains('remove-course')) {
            // console.log(e.getAttribute('data-id'));
            e.parentElement.parentElement.parentElement.remove()
            // course = e.parentElement.parentElement.parentElement
            let idCourse = e.getAttribute('data-id')
            this.removeFromLS(idCourse)
            this.courserCounter()
        }
    }
    removeFromLS(id) {
        let courseLS = getFromStorage()
        courseLS.forEach((course, index) => {
            if (course.id == id) {
                courseLS.splice(index, 1)
            }
        });
        localStorage.setItem('course', JSON.stringify(courseLS))
        this.showHideCourseResultDiv()
        // console.log(id);
    }
    courserCounter() {
        if ((JSON.parse(localStorage.getItem('course')).length) == 0) {
            courserCounterDiv.classList.add('hidden')
            // iconBasketResult.classList.add('hidden')

        } else {
            courserCounterDiv.classList.remove('hidden')
            // iconBasketResult.classList.remove('hidden')
            courserCounterDiv.innerHTML = (JSON.parse(localStorage.getItem('course')).length)
        }
    }
    showHideCourseResultDiv() {
        if ((JSON.parse(localStorage.getItem('course')).length) == 0) {
            // courserCounterDiv.classList.add('hidden')
            basketShoppingDiv.classList.remove('basket-shopping')
        } else {
            // courserCounterDiv.classList.remove('hidden')
            basketShoppingDiv.classList.add('basket-shopping')
            // courserCounterDiv.innerHTML = JSON.stringify(JSON.parse(localStorage.getItem('course')).length)
        }
    }
    rate(e) {
        let parent = e.parentElement
        let that = e.getAttribute('data-id')
        let firstChild = parent.firstElementChild.getAttribute('data-id')
        let lastChild = parent.lastElementChild.getAttribute('data-id')
        let children = parent.children
        if (e.classList.contains('text-yellow-600')) {
            for (let i = lastChild - 1; i > that - 1; i--) {
                children[i].classList.remove("text-yellow-600");
                // console.log(children[i]);
            }
        } else {
            for (let i = firstChild - 1; i <= that - 1; i++) {
                children[i].classList.add("text-yellow-600");
                // console.log(children[i]);
            }
        }

    }
    loadedStorage() {
        if (localStorage.length == 0) {
            console.log('it is 0');
            arrayData = []
            localStorage.setItem('course', arrayData)
        }
    }
    totalPrice() {
        let arrayLS = JSON.parse(localStorage.getItem('course'))
        let total = 0
        arrayLS.forEach(element => {
            let elementPrice = Number(element.price)
            total += elementPrice
            return total
        });
        console.log(total);
        let priceDiv = `
            <div class=" mx-1 border border-white">
                <p>مجموع قیمت : <span>${total}</span> تومان</p>
            </div>
        
        `
        total = '0'
      
        iconBasketResultPrice.innerHTML=priceDiv
    }
    removeTotal(e) {
        let totoalTarget = e.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.firstElementChild.textContent
        let target = e.parentElement.firstElementChild.firstElementChild.textContent
        let targetNumber = Number(target)
        let totoalTargetNumber = Number(totoalTarget)
        // let total2 = 0
        console.log(totoalTarget);
        // let arrayLS = JSON.parse(localStorage.getItem('course'))
        // arrayLS.forEach(element => {
        // let elementPrice = Number(element.price)
        // let total =
        let total2 = totoalTargetNumber - targetNumber
        // total += elementPrice
        // return total2
        console.log(total2);
        // });
        let priceDiv = `
            <div class=" mx-1 border border-white pr-1 ">
                <p class="-translate-x-1">مجموع قیمت : <span>${total2}</span> تومان</p>
            </div>
        
        `
       
        iconBasketResultPrice.innerHTML=priceDiv


        



    }
}











// courserList.addEventListener('click', (e) => {
//     product.buyCourse(e.target)
//     product.courserCounter()
//     favoritDiv.likeCourse(e.target)
//     favoritDiv.favCounter()
//     product.showHideCourseResultDiv()
//     favoritDiv.hideShowFavResultDiv()
//     product.totalPrice()

// })

document.addEventListener('DOMContentLoaded', () => {
    product.loadContentcart()
    product.courserCounter()
    favoritDiv.loadContentcart()
    favoritDiv.favCounter()
    product.showHideCourseResultDiv()
    favoritDiv.hideShowFavResultDiv()
    product.loadedStorage()
    product.totalPrice()
    // product.saveToLocalStorage()
    // favoritDiv.saveToLocalStorage()

})
iconBasketResult.addEventListener('click', (e) => {
    product.removeTotal(e.target)
    product.removeDivShoppingCart(e.target)

})
iconFavResult.addEventListener('click', (e) => {
    favoritDiv.removeDivShoppingCart(e.target)

})
// stars.forEach(star => {
//     star.addEventListener('click', (e) => {
//         product.rate(e.target)
//     })
// });










search.addEventListener('click', () => {
    // console.log('hi');
    searchInput.classList.remove('w-0')
    searchInput.classList.add('w-full')
    // console.log('hi');
})

searchInput.addEventListener('blur', () => {
    // console.log('hi');
    // console.log('hi');
    searchInput.classList.remove('w-full')
    searchInput.classList.add('w-0')
})





let product = new Product()
let favoritDiv = new FavoritDiv()





function shoppingCartDiv(cInfo) {
    let shoppingDiv = `
<div class="civil-shopping-cart flex mx-1 border border-white">
    <div class="cart-img w-1/3 h-full my-auto flex justify-center items-center">
        <img src="${cInfo.image}">
    </div>
    <div class="cart-desc w-2/3 block mr-3 mt-5">
        <div class="title ">
            <p class="my-6 text-xl">${cInfo.title}</p>
        </div>
        <div class="price flex relative">
            
            <p><span class="py-6">${cInfo.price}</span>تومان </p>
            <span
                class="flex justify-center items-center absolute left-5 translate-y-7 remove-course w-6 h-6 rounded-full text-gray-300 cursor-pointer z-20"
                data-id="${cInfo.id}">X</span>
        </div>
    </div>
</div>
    `

    iconBasketResult.insertAdjacentHTML('afterbegin', shoppingDiv)





}

function shoppingCartDiv2(cInfo) {
    let shoppingDiv = `
<div class="civil-shopping-cart flex mx-1 border border-white">
    <div class="cart-img w-1/3 h-full my-auto flex justify-center items-center">
        <img src="${cInfo.image}">
    </div>
    <div class="cart-desc w-2/3 block mr-3 mt-5">
        <div class="title ">
            <p class="my-6 text-xl">${cInfo.title}</p>
        </div>
        <div class="price flex relative">
            <span class="py-6">${cInfo.price} تومان</span>
            <span
                class="flex justify-center items-center absolute left-5 translate-y-7 remove-course w-6 h-6 rounded-full text-gray-300 cursor-pointer z-20"
                data-id="${cInfo.id}">X</span>
        </div>
    </div>
</div>`

    iconFavResult.insertAdjacentHTML('afterbegin', shoppingDiv)
}

function getFromStorage() {
    let courseArray
    if (localStorage.getItem('course')) {
        courseArray = JSON.parse(localStorage.getItem('course'))
    } else {
        courseArray = []
    }
    return courseArray
}

function getFromStorage2() {
    let favArray
    if (localStorage.getItem('fav')) {
        favArray = JSON.parse(localStorage.getItem('fav'))
    } else {
        favArray = []
    }
    return favArray
}