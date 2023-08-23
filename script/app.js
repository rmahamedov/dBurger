// Создаём базу данных для продуктов

const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dburger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}


const navBasketBtn = document.querySelector('.navbar__content-btn'),
    dropDown = document.querySelector('.navbar__content-dropdown'),
    navBasketCount = document.querySelector('.navbar__content-count'),
    navBasketCheckList = document.querySelector('.navbar__content-checklist'),
    orderBtn = document.querySelector('.navbar__content-dropdownBottom'),
    productBtn = document.querySelectorAll('.product__list-basket'),
    navBasketClose = document.querySelector('.navbar__content-close'),
    totalPrice = document.querySelector('.navbar__content-totalPrice')


productBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(element) {
    let parent = element.closest('.product__list-card')
    let parentId = parent.getAttribute('id')

    product[parentId].amount++
    basket()
}


function basket() {
    const productArray = [];

    for (let key in product) {
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        const productIndicator = productCard.querySelector('.product__list-count')

        if (po.amount) {
            productArray.push(po)
            productIndicator.classList.add('active')
            productIndicator.innerHTML = po.amount
        } else {
            productIndicator.classList.remove('active')
            productIndicator.innerHTML = 0
        }
    }

    navBasketCheckList.innerHTML = ''
    productArray.forEach(obj => {
        navBasketCheckList.innerHTML += cardChecklistItem(obj)
    })

    const allCount = totalCountProduct()

    if (allCount) navBasketCount.classList.add('active')
    else navBasketCount.classList.remove('active')

    navBasketCount.innerHTML = allCount

    totalPrice.innerHTML = totalPriceProduct()
}

function cardChecklistItem(data) {
    const { name, price, img, amount } = data

    return `
<div class="navbar__content-product">
    <img width="70px" src=${img} alt="burger">
    <div class="navbar__content-info">
        <p class="navbar__content-name">${name}</p>
        <p class="navbar__content-price">${price} сум</p>
    </div>
    <div class="navbar__content-controller" id="${name.toLowerCase()}_card">
        <button class="navbar__content-minus symbol-button" data-symbol="-">-</button>
        <span>${amount}</span>
        <button class="navbar__content-plus symbol-button" data-symbol="+">+</button>
    </div>
</div>
    `
}


function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}

navBasketBtn.addEventListener('click', (e) => {
    e.preventDefault()
    dropDown.classList.add('active')
})

navBasketClose.addEventListener('click', (e) => {
    e.preventDefault()
    dropDown.classList.remove('active')
})

function totalPriceProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}



window.addEventListener('click', (e) => {

    if (e.target.classList.contains('symbol-button')) {
        const attr = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.navbar__content-controller')
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idParent].amount--
            else if (attr == '+') product[idParent].amount++
            basket()
        }
    }
})


const printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer'),
    print = document.querySelector('.print'),
    productCount = document.querySelectorAll('.product__list-count')

orderBtn.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const { name, totalSum, amount } = product[key]
        if (amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
                <p>
                    <span>${name}</span>
                    <span>${amount}</span>
                </p>
                <p>${totalSum}</p>
            </div>
            `
            print.style = 'display: flex;'
        }
    }

    printFooter.innerHTML = `Общая сумма ${totalPriceProduct()}`
    setTimeout(() => {
        print.style = 'display: none;'
    }, 5000);
    navBasketCheckList.innerHTML = ''
    for (const key in product) {
        product[key].amount = 0
    }
    navBasketCount.classList.remove('active')  
    productCount.forEach(count => {
        count.classList.remove('active')
    })
    totalPrice.innerHTML = 0
})

