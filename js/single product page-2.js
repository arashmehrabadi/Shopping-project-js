// for all page
let iconBasketResult = document.querySelector('.icon-basket-result .top')
let iconBasketResultPrice = document.querySelector('.icon-basket-result .down')
let basketShoppingDiv = document.querySelector('.show-hide')
let courserCounterDiv = document.querySelector('.basket-shopping span')
let iconFavResult = document.querySelector('.icon-fav-result .top')
let favCounterDiv = document.querySelector('.fav-shopping  span')
let favShoppingDiv = document.querySelector('.hide-show')
let search = document.querySelector('.fa-magnifying-glass')
let searchInput = document.querySelector('#search')
// single product page
let backColor = document.querySelector('.product-color')
let blueSpan = document.querySelector('.color .blue-span')
let redSpan = document.querySelector('.color .red-span')
let graySpan = document.querySelector('.color .gray-span')
let orangeSpan = document.querySelector('.color .orange-span')
let charColor = document.querySelector('.descriptions .color-desc span')
let bagButton = document.querySelector('.descriptions button')
let sizes = document.querySelectorAll('option')
let select = document.querySelector('select')


class FavoritDiv {
    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[1].getAttribute('data-id')
        }
        console.log(course.img);
        this.addToCart(course)
        this.saveToLocalStorage(course)
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
            e.parentElement.parentElement.parentElement.remove()
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
            favShoppingDiv.classList.remove('fav-shopping')
        } else {
            favShoppingDiv.classList.add('fav-shopping')
        }
    }
}

let favoritDiv = new FavoritDiv()


class Product {

    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[0].getAttribute('data-id')
        }

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
            e.parentElement.parentElement.parentElement.remove()
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
    }
    courserCounter() {
        if ((JSON.parse(localStorage.getItem('course')).length) == 0) {
            courserCounterDiv.classList.add('hidden')
        } else {
            courserCounterDiv.classList.remove('hidden')
            courserCounterDiv.innerHTML = (JSON.parse(localStorage.getItem('course')).length)
        }
    }
    showHideCourseResultDiv() {
        if ((JSON.parse(localStorage.getItem('course')).length) == 0) {
            basketShoppingDiv.classList.remove('basket-shopping')
        } else {
            basketShoppingDiv.classList.add('basket-shopping')
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
            }
        } else {
            for (let i = firstChild - 1; i <= that - 1; i++) {
                children[i].classList.add("text-yellow-600");
            }
        }

    }
    // loadedStorage() {
    //     if (localStorage.length == 0) {
    //         console.log('it is 0');
    //         arrayData = []
    //         localStorage.setItem('course', arrayData)
    //     }
    // }
    totalPrice() {
        let arrayLS = JSON.parse(localStorage.getItem('course'))
        let total = 0
        arrayLS.forEach(element => {
            let elementPrice = Number(element.price)
            total += elementPrice
            return total
        });
        let priceDiv = `
            <div class=" mx-1 border border-white">
                <p>مجموع قیمت : <span>${total}</span> تومان</p>
            </div>
        
        `
        total = '0'

        iconBasketResultPrice.innerHTML = priceDiv
    }
    removeTotal(e) {
        let totoalTarget = e.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.firstElementChild.textContent
        let target = e.parentElement.firstElementChild.firstElementChild.textContent
        let targetNumber = Number(target)
        let totoalTargetNumber = Number(totoalTarget)
        let total2 = totoalTargetNumber - targetNumber
        let priceDiv = `
            <div class=" mx-1 border border-white pr-1 ">
                <p class="-translate-x-1">مجموع قیمت : <span>${total2}</span> تومان</p>
            </div>
        
        `
        iconBasketResultPrice.innerHTML = priceDiv
    }
}

let product = new Product()

class SingleProduct {
    blueColor() {
        backColor.classList.remove('bg-red-200', 'bg-orange-200', 'bg-gray-200')
        blueSpan.classList.add('p-1.5')
        backColor.classList.add('bg-blue-200')
        redSpan.classList.remove('p-1.5')
        graySpan.classList.remove('p-1.5')
        orangeSpan.classList.remove('p-1.5')
        charColor.innerHTML = `آبی`
    }

    redColor() {
        backColor.classList.remove('bg-blue-200', 'bg-orange-200', 'bg-gray-200')
        redSpan.classList.add('p-1.5')
        backColor.classList.add('bg-red-200')
        blueSpan.classList.remove('p-1.5')
        graySpan.classList.remove('p-1.5')
        orangeSpan.classList.remove('p-1.5')
        charColor.innerHTML = `قرمز`

    }
    grayColor() {
        backColor.classList.remove('bg-blue-200', 'bg-orange-200', 'bg-red-200')
        graySpan.classList.add('p-1.5')
        backColor.classList.add('bg-gray-200')
        blueSpan.classList.remove('p-1.5')
        redSpan.classList.remove('p-1.5')
        orangeSpan.classList.remove('p-1.5')
        charColor.innerHTML = `خاکستری`

    }
    orangeColor() {
        backColor.classList.remove('bg-blue-200', 'bg-red-200', 'bg-gray-200')
        orangeSpan.classList.add('p-1.5')
        backColor.classList.add('bg-orange-200')
        blueSpan.classList.remove('p-1.5')
        graySpan.classList.remove('p-1.5')
        redSpan.classList.remove('p-1.5')
        charColor.innerHTML = `نارنجی`
    }
    getBagInfo() {
        let bagShopCourse = {
            image: document.querySelector('.bag-img').src,
            title: document.querySelector('.descriptions h3').textContent,
            price: document.querySelector('.descriptions .price span').innerHTML,
            color: document.querySelector('.descriptions .color-desc span').textContent,
            size: document.querySelector('select').value
        }
        this.addToCart(bagShopCourse)
        this.addToLS(bagShopCourse)
    }

    addToCart(cInfo) {
        shoppingCartDiv(cInfo)
    }
    addToLS(bagShopCourse) {
        let bagArray = getBagCourseFromLS()
        bagArray.push(bagShopCourse)
        localStorage.setItem('course', JSON.stringify(bagArray))
    }
    removeDivShoppingCart(e) {
        if (e.classList.contains('remove-course')) {
            e.parentElement.parentElement.parentElement.remove()
        }
        let imgSrc = e.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src
        this.showBtn(imgSrc)
        this.removeFromLS(imgSrc)
        product.courserCounter()
        product.showHideCourseResultDiv()
    }
    removeFromLS(img) {
        let getFromLS = getBagCourseFromLS()
        getFromLS.forEach((bagShopCourse, index) => {
            if (bagShopCourse.image == img) {
                getFromLS.splice(index, 1)
            }
            localStorage.setItem('course', JSON.stringify(getFromLS))

        });
    }
    courserCounter() {
        if ((JSON.parse(localStorage.getItem('course')).length) == 0) {
            courserCounterDiv.classList.add('hidden')
        } else {
            courserCounterDiv.classList.remove('hidden')
            courserCounterDiv.innerHTML = (JSON.parse(localStorage.getItem('course')).length)
        }
    }
    hideBtn() {
        let bagShopCourse = {
            image: document.querySelector('.bag-img').src,
            title: document.querySelector('.descriptions h3').textContent,
            price: document.querySelector('.descriptions .price span').innerHTML,
            color: document.querySelector('.descriptions .color-desc span').textContent,
            size: document.querySelector('select').value
        }
        let getFromLS = getBagCourseFromLS()
        getFromLS.forEach((element) => {
            if (element.image == bagShopCourse.image) {
                bagButton.classList.add('hidden')
            }
            localStorage.setItem('course', JSON.stringify(getFromLS))
        });

    }
    showBtn(img){
        let getFromLS = getBagCourseFromLS()
        console.log(img);
        getFromLS.forEach((element) => {
            if (element.image == img) {
                bagButton.classList.remove('hidden')
            }
            localStorage.setItem('course', JSON.stringify(getFromLS))
        });
        
    }
    loadedStorage() {
        if (localStorage.length == 0) {
            // console.log("object");
            let courseArray
            if (localStorage.getItem('course')) {
                courseArray = JSON.parse(localStorage.getItem('course'))
            } else {
                courseArray = []
            }
            let strCourse = JSON.stringify(courseArray)
            localStorage.setItem('course', strCourse)


            let favArray
            if (localStorage.getItem('fav')) {
                favArray = JSON.parse(localStorage.getItem('fav'))
            } else {
                favArray = []
            }
            let strCoursee = JSON.stringify(courseArray)
            localStorage.setItem('fav', strCoursee)

            let arrayRate
            if (localStorage.getItem('rated')) {
                arrayRate = JSON.parse(localStorage.getItem('rated'))
            } else {
                arrayRate = []
            }
            let strCourseee = JSON.stringify(arrayRate)
            localStorage.setItem('rated', strCourseee)

        }

    }
    disableBtn(){
        bagButton.disabled=true
    }
    enableBtn(){
        bagButton.disabled=false
    }
    validateBtn(){
        if ((backColor.classList.contains('bg-blue-200')||backColor.classList.contains('bg-red-200')||backColor.classList.contains('bg-orange-200')||backColor.classList.contains('bg-gray-200')||backColor.classList.contains('bg-blue-200'))&&(select.value==1||select.value==2||select.value==3||select.value==4)) {
            // console.log('object');
            this.enableBtn()
        }else{
            this.disableBtn()
        }
    }
}


let singleProduct = new SingleProduct()



// events
// search Events

search.addEventListener('click', () => {
    searchInput.classList.remove('w-0')
    searchInput.classList.add('w-full')
})

searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('w-full')
    searchInput.classList.add('w-0')
})

// fav events

document.addEventListener('DOMContentLoaded', () => {
    singleProduct.loadedStorage()
    favoritDiv.loadContentcart()
    favoritDiv.favCounter()
    favoritDiv.hideShowFavResultDiv()
})
iconFavResult.addEventListener('click', (e) => {
    favoritDiv.removeDivShoppingCart(e.target)
})

// product events

document.addEventListener('DOMContentLoaded', () => {
    product.loadContentcart()
    // product.loadedStorage()
    product.totalPrice()
    product.courserCounter()
    product.showHideCourseResultDiv()
    singleProduct.hideBtn()
    singleProduct.validateBtn()
})
iconBasketResult.addEventListener('click', (e) => {
    product.removeTotal(e.target)
    product.removeDivShoppingCart(e.target)
})

// single product events
blueSpan.addEventListener('click', () => {
    singleProduct.blueColor()
})

redSpan.addEventListener('click', () => {
    singleProduct.redColor()
})

graySpan.addEventListener('click', () => {
    singleProduct.grayColor()
})

orangeSpan.addEventListener('click', () => {
    singleProduct.orangeColor()
})
bagButton.addEventListener('click', (e) => {
    e.preventDefault()
    singleProduct.getBagInfo(e.target)
    product.totalPrice()
    singleProduct.courserCounter()
    product.showHideCourseResultDiv()
    singleProduct.hideBtn()
})
iconBasketResult.addEventListener('click', (e) => {
    singleProduct.removeDivShoppingCart(e.target)
    singleProduct.removeFromLS()

})
document.addEventListener('click',()=>{
    singleProduct.validateBtn()
})


// functions
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
            <p><span class="py-6">${cInfo.price} </span>تومان</p>
            <span
                class="flex justify-center items-center absolute left-5 translate-y-7 remove-course w-6 h-6 rounded-full text-gray-300 cursor-pointer z-20"
                data-id="${cInfo.id}">X</span>
        </div>
    </div>
</div>`

    iconFavResult.insertAdjacentHTML('afterbegin', shoppingDiv)
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

function getFromStorage() {
    let courseArray
    if (localStorage.getItem('course')) {
        courseArray = JSON.parse(localStorage.getItem('course'))
    } else {
        courseArray = []
    }
    return courseArray
}

function getBagCourseFromLS() {
    let bagArray
    if (localStorage.getItem('course')) {
        bagArray = JSON.parse(localStorage.getItem('course'))
    } else {
        bagArray = []
    }
    return bagArray
}