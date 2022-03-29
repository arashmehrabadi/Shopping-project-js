let courserList = document.querySelector('.courser')
let iconBasketResult = document.querySelector('.icon-basket-result .top')
let iconBasketResults = document.querySelectorAll('.icon-basket-result .top')
let iconBasketResultPrice = document.querySelector('.icon-basket-result .down')
let basketShoppingDiv = document.querySelector('.show-hide')

let addToShoppingCart = document.querySelector('.basket-icone')
let addToShoppingCarts = document.querySelectorAll('.basket-icone')

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
        }
    }
    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[1].getAttribute('data-id'),
        }
        console.log(course);
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





class Product {
    buyCourse(e) {
        if (e.classList.contains('basket-icone')) {
            let cart = e.parentElement.parentElement.parentElement.parentElement
            this.getCourseInfo(cart)
        }
    }
    getCourseInfo(courseInfo) {
        let course = {
            image: courseInfo.querySelector('.course-img').src,
            title: courseInfo.querySelector('.product p').textContent,
            price: courseInfo.querySelector('.product span').textContent,
            id: courseInfo.querySelectorAll('i')[0].getAttribute('data-id'),
        }

        this.totalPrice()
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
        console.log('hehe');

    }
    loadedStorage() {
        if (localStorage.length == 0) {
            console.log("object");
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
    hoverIconProducts(e) {
        e.classList.add('text-yellow-600', 'cursor-not-allowed', 'clicked')
        e.classList.remove('basket-icone')
        console.log('clicked');
    }
}
courserList.addEventListener('mousedown', (e) => {
    product.buyCourse(e.target)
    product.courserCounter()
    favoritDiv.likeCourse(e.target)
    favoritDiv.favCounter()
    product.showHideCourseResultDiv()
    favoritDiv.hideShowFavResultDiv()
    product.totalPrice()

})

document.addEventListener('DOMContentLoaded', () => {
    product.loadedStorage()
    product.loadContentcart()
    product.courserCounter()
    favoritDiv.loadContentcart()
    favoritDiv.favCounter()
    product.showHideCourseResultDiv()
    favoritDiv.hideShowFavResultDiv()
    product.totalPrice()
})
iconBasketResult.addEventListener('click', (e) => {
    product.removeTotal(e.target)
    product.removeDivShoppingCart(e.target)

})
iconFavResult.addEventListener('click', (e) => {
    favoritDiv.removeDivShoppingCart(e.target)

})
stars.forEach(star => {
    star.addEventListener('click', (e) => {
        product.rate(e.target)
    })
});

addToShoppingCarts.forEach(element => {
    element.addEventListener('mouseup', (e) => {
        product.hoverIconProducts(e.target)
    })
});
search.addEventListener('click', () => {
    searchInput.classList.remove('w-0')
    searchInput.classList.add('w-full')
})

searchInput.addEventListener('blur', () => {
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

iconBasketResult.addEventListener('click', test)

function test(e) {
    let targetAttribute = e.target.getAttribute('data-id')
    console.log(targetAttribute);
    products.forEach(element => {
        let getAttribute = element.children[0].children[0].children[0].children[0].getAttribute('data-id')
        console.log(getAttribute);
        let basketIconClass = element.children[0].children[0].children[0].children[0]

        if (targetAttribute == getAttribute) {
            basketIconClass.classList.remove('cursor-not-allowed')
            basketIconClass.classList.remove('text-yellow-600')
            basketIconClass.classList.add('basket-icone')
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    let LSOb = JSON.parse(localStorage.getItem('course'))
    LSOb.forEach(element => {
        let getLSAttribute = element.id
        products.forEach(element => {
            let getProductAttribute = element.children[0].children[0].children[0].children[0].getAttribute('data-id')
            let basketIconClass = element.children[0].children[0].children[0].children[0]
            if (getLSAttribute == getProductAttribute) {

                basketIconClass.classList.add('cursor-not-allowed', 'text-yellow-600')
            }
        });
    });

})

stars.forEach(star => {
    star.addEventListener('click', (e) => {
        let productAttribute = e.target.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute('data-id')
        let rateAttribute = e.target.getAttribute('data-id')
        let getRateID = {
            productAttribute: productAttribute,
            rateAttribute: rateAttribute
        }
        localStorage.getItem('rated')
        let arrayRate
        if (localStorage.getItem('rated')) {
            arrayRate = JSON.parse(localStorage.getItem('rated'))
            console.log(arrayRate);
        } else {
            arrayRate = []
        }
        arrayRate.push(getRateID)
        localStorage.setItem('rated', JSON.stringify(arrayRate))
    })
});
document.addEventListener('DOMContentLoaded', () => {
    let LSRate = JSON.parse(localStorage.getItem('rated'))
    rates.forEach(rate => {
        LSRate.forEach(lSRate => {
            products.forEach(product => {
                let firstChild = rate.firstElementChild.getAttribute('data-id')
                let lastChild = rate.lastElementChild.getAttribute('data-id')


                let thatAttribute = lSRate.rateAttribute
                let LSProductAttribute = lSRate.productAttribute

                let productAttribute = product.children[0].firstElementChild.firstElementChild.firstElementChild.getAttribute('data-id')
                let productAttributeParrent = product.children[3].children
                if (productAttribute == LSProductAttribute) {
                    for (let i = lastChild - 1; i > thatAttribute - 1; i--) {
                        productAttributeParrent[i].classList.remove("text-yellow-600");
                    }
                }
                if (productAttribute == LSProductAttribute) {
                    for (let i = firstChild - 1; i <= thatAttribute - 1; i++) {

                        productAttributeParrent[i].classList.add("text-yellow-600");
                    }
                }
            });

        });

    });
})