let productControls = Array.from(document.querySelectorAll('.product__quantity-controls'));
let cartProduct = document.querySelector(".cart__products");
let productAdd = document.querySelectorAll(".product__add");
let endPoint;

changeCount(productControls);

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

if (localStorage.length !== undefined) {
    document.querySelector(".cart").style.visibility = "visible";
}

const generateCartProduct = (imgSrc, dataId, pastValue) => {
    return `<div class="cart__product" data-id= ${dataId}>
                <img class="cart__product-image" src =${imgSrc}>
                <div class="cart__product-count">${pastValue}</div>
                <div class="product__quantity-controls">
                    <button class="cart__product_remove">Удaлить</button>
                </div>
            </div>`
}

function searchCart(elems, dataId) {
    for (let elem of elems.children) {
        if (elem.dataset.id === dataId) {
            return elem;
        } 
    }
}

function endPositionElement(elem) {
    endPoint = {
        x: elem.left, 
        y: elem.top
    };   
}

function addCart(event) {
    let product = event.target.closest(".product");
    let dataId = product.dataset.id; 
    let pastValue = +product.querySelector(".product__quantity-value").innerText;
    let productImg = product.querySelector(".product__image")
    let imgSrc = productImg.getAttribute("src");

    let flyingImage = productImg.cloneNode(false); 
  
    let cart = searchCart(cartProduct, dataId);
    
    if (cart !== undefined) {
        let cartProductCount = cart.querySelector(".cart__product-count");
        let endPosition = cart.querySelector(".cart__product-image").getBoundingClientRect();
        
        cartProductCount.innerText = +cartProductCount.innerText + pastValue; 
        endPositionElement(endPosition);
        localStorage.setItem("cart", cartProduct.innerHTML);
        return;
    }

    cartProduct.insertAdjacentHTML("afterbegin", generateCartProduct(imgSrc, dataId, pastValue)); 
    
    if (cartProduct.children) {
        document.querySelector(".cart").style.visibility = "visible"; 
    }  

    if (endPoint == undefined) {
        endPosition = cartProduct.querySelector(".cart__product-image").getBoundingClientRect();
        endPositionElement(endPosition);
    }
 
    const startPoint = {
        x: productImg.getBoundingClientRect().left, 
        y: productImg.getBoundingClientRect().top        
    }    

    flyingImage.style.position = 'fixed';
    flyingImage.style.left = startPoint.x + 'px';
    flyingImage.style.top = startPoint.y + 'px';     
    document.querySelector('.cart').appendChild(flyingImage);
    animateElementToElement(flyingImage, endPoint, 7, 100);

    localStorage.setItem("cart", cartProduct.innerHTML);
}

productAdd.forEach((el) => {
     el.addEventListener("click", addCart);
})

function animateElementToElement(elem, target, nSteps, tStep) {
    if (nSteps === 1) {
        elem.remove(); 
        return;   
    } 

    const point = {
        x: elem.getBoundingClientRect().left, 
        y: elem.getBoundingClientRect().top    
    }
  
    point.x += (target.x - point.x) / nSteps;
    point.y += (target.y - point.y) / nSteps;
  
    elem.style.left = point.x + 'px';
    elem.style.top = point.y + 'px';
    
    setTimeout(() => animateElementToElement(elem, target, nSteps - 1, tStep), tStep);
}

cartProduct.addEventListener("click", remuveCart);

function remuveCart(event) {
    let productRemove = event.target.closest(".cart__product_remove");
    let remuveCart = productRemove.closest(".cart__product").remove();  
     if (!cartProduct.children.length) {
        document.querySelector(".cart").style.visibility = "hidden"; 
    } 
    
    localStorage.setItem("cart", cartProduct.innerHTML);
}

cartProduct.innerHTML = localStorage.getItem("cart");

