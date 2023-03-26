let productControls = Array.from(document.querySelectorAll('.product__quantity-controls'));
let cartProduct = document.querySelector(".cart__products");
let productAdd = document.querySelectorAll(".product__add");
let endPoint;
let startPoint;

let mus = [];

let statusInit = initProductList();

let generateCartProduct = (imgSrc, dataId, pastValue) => {
    return `<div class="cart__product" data-id= ${dataId}>
                <img class="cart__product-image" src =${imgSrc}>
                <div class="cart__product-count">${pastValue}</div>
                <div class="product__quantity-controls">
                    <button class="cart__product_remove">Удaлить</button>
                </div>
            </div>`
}

changeCount(productControls);

cartProduct.addEventListener("click", remuveCart);

drawProduct(mus);

productAdd.forEach((el) => {
     el.addEventListener("click", addCart);
})

function initProductList() {
    let initProduct;

    if (localStorage.length !== undefined || localStorage.length !== 0 || localStorage.length !== null) {
        document.querySelector(".cart").style.visibility = "visible";
    }

    let cart = localStorage.getItem('cart');
    if (cart === "" || cart === null || cart === undefined) {
        return false;
    }

    initProduct = JSON.parse(cart);

    if (initProduct === null || initProduct == undefined) {
        return false;
    }

    mus = initProduct;

    return true;
}

function changeCount(elem) {
    elem.forEach((el) => {
        el.addEventListener("click", (event) => {
            let productValue = el.querySelector(".product__quantity-value")
            let count = +productValue.innerText;
            
            if (event.target.classList.contains('product__quantity-control_inc')) {
                count++;
                productValue.innerText = count;
            } else {
                if (count > 1) {
                    count--;
                    productValue.innerText = count;
                }
            }
        })
    })
}

function searchCart(cartProduct, dataId) {
    let cartProductList = Array.from(cartProduct.querySelectorAll('.cart__product'));

    return cartProductList.find((elem) => elem.dataset.id == dataId);
}

function endPositionElement(elem) {
    endPoint = {
        x: elem.left,
        y: elem.top,
    };
}

function startPoints(elem, elem1) {
    startPoint = {
        x: elem.left,
        y: elem.top,
    }

    elem1.style.position = 'fixed';
    elem1.style.left = startPoint.x + 'px';
    elem1.style.top = startPoint.y + 'px';
    
    document.querySelector('.cart').appendChild(elem1);
}


function drawProduct(elem) {
    if (elem == null || elem == undefined) {
        return;
    }

    for (let i = 0; i < elem.length; i++) {
        let localDataId = elem[i].dataId;
        let localImgSrc = elem[i].imgSrc;
        let localPastValue = elem[i].pastValue;
        
        cartProduct.insertAdjacentHTML("afterbegin", generateCartProduct(localImgSrc, localDataId, localPastValue));
    }
}

function addCart(event) {
    let product = event.target.closest(".product");
    let dataId = product.dataset.id;
    let pastValue = +product.querySelector(".product__quantity-value").innerText;
    let productImg = product.querySelector(".product__image");
    let startPointImg = productImg.getBoundingClientRect();
    let imgSrc = productImg.getAttribute("src");

    let flyingImage = productImg.cloneNode(false);
  
    let mapValue = {
        dataId: dataId,
        imgSrc: imgSrc,
        pastValue: pastValue,
    }

    if (cartProduct.children) {
        document.querySelector(".cart").style.visibility = "visible";
    }

    let cart = searchCart(cartProduct, dataId);
    
    if (cart !== undefined) {
        let cartProductCount = cart.querySelector(".cart__product-count");
        let endPosition = cart.querySelector(".cart__product-image").getBoundingClientRect();

        cartProductCount.innerText = +cartProductCount.innerText + pastValue;
        endPositionElement(endPosition);

        for (let i = 0; i < mus.length; i++){
            if(mus[i].dataId == dataId) {
                mus[i].pastValue = cartProductCount.innerText;
            }
        }

        startPoints(startPointImg, flyingImage);
        animateElementToElement(flyingImage, endPoint, 7, 100);
        localStorage.setItem("cart", JSON.stringify(mus));

        return;
    }

    cartProduct.insertAdjacentHTML("afterbegin", generateCartProduct(imgSrc, dataId, pastValue));
    
    mus.push(mapValue);
   
    startPoints(startPointImg, flyingImage);
    if (endPoint == undefined) {
        endPosition = cartProduct.querySelector(".cart__product-image").getBoundingClientRect();
        endPositionElement(endPosition);
    }

    animateElementToElement(flyingImage, endPoint, 7, 100);
    localStorage.setItem("cart", JSON.stringify(mus));
}

function animateElementToElement(elem, target, nSteps, tStep) {
    if (nSteps === 1) {
        elem.remove();
        return;
    }

    const point = {
        x: elem.getBoundingClientRect().left,
        y: elem.getBoundingClientRect().top,
    }
  
    point.x += (target.x - point.x) / nSteps;
    point.y += (target.y - point.y) / nSteps;
  
    elem.style.left = point.x + 'px';
    elem.style.top = point.y + 'px';
    
    setTimeout(() => animateElementToElement(elem, target, nSteps - 1, tStep), tStep);
}

function remuveCart(event) {
    let productRemove = event.target.closest(".cart__product_remove");

    let remuveCart = productRemove.closest(".cart__product");
    let dataIdRemuveCart = remuveCart.dataset.id;

    remuveCart.remove();

    let index = mus.findIndex((el) => el.dataId === dataIdRemuveCart);
    if (index !== -1) {
        mus.splice(index, 1);
    }

    if (!cartProduct.children.length) {
        document.querySelector(".cart").style.visibility = "hidden";
    }
    
    localStorage.setItem("cart", JSON.stringify(mus));
}


