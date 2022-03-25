let courserList = document.querySelector('.courser')
// let topRateList = document.querySelector('.coursers')
let iconBasketResult = document.querySelector('.icon-basket-result .top')
let iconBasketResultPrice = document.querySelector('.icon-basket-result .down')
// console.log(iconBasketResultPrice.parentElement);
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
        console.log(course.img);
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
            // console.log('by');
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
            // courserCounterDiv.innerHTML = (JSON.parse(localStorage.getItem('course')).length)
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
        // console.log(total);
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
        // let total2 = 0
        // console.log(totoalTarget);
        // console.log(target);
        // let arrayLS = JSON.parse(localStorage.getItem('course'))
        // arrayLS.forEach(element => {
        // let elementPrice = Number(element.price)
        // let total =
        let total2 = totoalTargetNumber - targetNumber
        // total += elementPrice
        // return total2
        // console.log(total2);
        // });
        let priceDiv = `
            <div class=" mx-1 border border-white pr-1 ">
                <p class="-translate-x-1">مجموع قیمت : <span>${total2}</span> تومان</p>
            </div>
        
        `

        iconBasketResultPrice.innerHTML = priceDiv






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
    // product.courserCounter()
    favoritDiv.loadContentcart()
    favoritDiv.favCounter()
    // product.showHideCourseResultDiv()
    favoritDiv.hideShowFavResultDiv()
    product.loadedStorage()
    product.totalPrice()

    singleProduct.disableBtn()
    singleProduct.showBtn()
    // product.saveToLocalStorage()
    // favoritDiv.saveToLocalStorage()
    // product.getCourseInfo()

})
iconBasketResult.addEventListener('click', (e) => {
    product.removeTotal(e.target)
    product.removeDivShoppingCart(e.target)
    singleProduct.removeDivShoppingCart(e.target)
    singleProduct.hideBtn(e.target)

})
iconFavResult.addEventListener('click', (e) => {
    favoritDiv.removeDivShoppingCart(e.target)

})










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
            <p><span class="py-6">${cInfo.price} </span>تومان</p>
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





let backColor = document.querySelector('.product-color')
let blueSpan = document.querySelector('.color .blue-span')
let redSpan = document.querySelector('.color .red-span')
let graySpan = document.querySelector('.color .gray-span')
let orangeSpan = document.querySelector('.color .orange-span')
let charColor = document.querySelector('.descriptions .color-desc span')
let bagButton = document.querySelector('.descriptions button')
let sizes = document.querySelectorAll('option')
let select = document.querySelector('select')
// console.log(sizes);
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
            // id: courseInfo.querySelectorAll('i')[0].getAttribute('data-id')
        }
        this.addToCart(bagShopCourse)
        this.addToLS(bagShopCourse)
        // console.log(bagShopCourse.image);
    }

    addToCart(cInfo) {
        shoppingCartDiv(cInfo)
    }
    addToLS(bagShopCourse) {
        let bagArray = getBagCourseFromLS()
        bagArray.push(bagShopCourse)
        localStorage.setItem('course', JSON.stringify(bagArray))

    }
    loadedBShCart() {
        let getFromLS = getBagCourseFromLS()
        getFromLS.forEach(cInfo => {
            shoppingCartDiv(cInfo)
        });
    }
    removeDivShoppingCart(e) {
        if (e.classList.contains('remove-course')) {
            // console.log(e.getAttribute('data-id'));
            e.parentElement.parentElement.parentElement.remove()
            // course = e.parentElement.parentElement.parentElement
            // console.log('by');
        }
        let imgSrc = e.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src
        this.removeFromLS(imgSrc)
        // this.showBtn(imgSrc)
        this.hideBtn(imgSrc)
        // console.log(imgSrc);
    }
    removeFromLS(img) {
        // let imgSrc = e.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.src
        // this.removeFromLS(imgSrc)
        // this.showBtn(imgSrc)
        // this.hideBtn(imgSrc)
        // console.log(imgSrc);
        let getFromLS = getBagCourseFromLS()
        getFromLS.forEach((bagShopCourse, index) => {
            if (bagShopCourse.image == img) {
                getFromLS.splice(index, 1)
            }
            localStorage.setItem('course', JSON.stringify(getFromLS))

        });
        // localStorage.setItem('course', JSON.stringify(courseLS))
        // this.showHideCourseResultDiv()
        // // console.log(id);
        // if (getFromLS !== 0) {
        //     getFromLS.lastElementChild.remove()
        // }

        // getFromLS.forEach(element => {
        //     console.log(element);
        // });
    }
    disableBtn() {
        bagButton.disabled = true
    }
    enableBtn() {
        bagButton.disabled = false
    }
    hideBtn(img) {
        
        bagButton.classList.add('hide-btn')

    }
    showBtn(img) {
        let getFromLS = getBagCourseFromLS()
        getFromLS.forEach(element => {
            if (element.image == img) {
                
                bagButton.classList.remove('hide-btn')
                // console.log('if');
            } else {
                // console.log('else');
                bagButton.classList.add('hide-btn')


            }
        });
    }
    select() {
        if (select.value == 1 || select.value == 2 || select.value == 3 || select.value == 4) {
            select.classList.add('selected')
            // console.log('true');
        } else {
            select.classList.remove('selected')
        }
        // console.log(select.value);
    }

    validateBagShop() {
        if ((backColor.classList.contains('bg-blue-200') || backColor.classList.contains('bg-red-200') || backColor.classList.contains('bg-gray-200') || backColor.classList.contains('bg-orange-200')) && (select.classList.contains('selected'))) {
            this.enableBtn()
            // console.log('yes');
        } else {
            this.disableBtn()
            // console.log('no');
        }
    }

}


let singleProduct = new SingleProduct()


// addEventListeners
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
    product.courserCounter()
    // product.showHideCourseResultDiv()
    e.preventDefault()
    singleProduct.getBagInfo(e.target)
    singleProduct.hideBtn(e.target)
    singleProduct.showBtn()
})


select.addEventListener('click', () => {
    singleProduct.select()
})
// });
// select.addEventListener('change', () => {
//     singleProduct.options()
// })




// functions
// function getBagCourseFromLS() {
//     let bagArray
//     if (localStorage.getItem('bagCourse')) {
//         bagArray = JSON.parse(localStorage.getItem('bagCourse'))
//     } else {
//         bagArray = []
//     }
//     return bagArray
// }
function getBagCourseFromLS() {
    let bagArray
    if (localStorage.getItem('course')) {
        bagArray = JSON.parse(localStorage.getItem('course'))
    } else {
        bagArray = []
    }
    return bagArray
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
            
            <p><span class="py-6">${cInfo.price}</span></p>
            <span
                class="flex justify-center items-center absolute left-5 translate-y-7 remove-course w-6 h-6 rounded-full text-gray-300 cursor-pointer z-20"
                data-id="${cInfo.id}">X</span>
        </div>
    </div>
</div>
    `

    iconBasketResult.insertAdjacentHTML('afterbegin', shoppingDiv)





}
document.addEventListener('click', () => {
    singleProduct.validateBagShop()
    singleProduct.showBtn()
})