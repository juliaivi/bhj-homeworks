let productControls = Array.from(document.querySelectorAll('.product__quantity-controls'));//для счетчика(изменение количества товара)
let cartProduct = document.querySelector(".cart__products");//корзина//количество товара
let productAdd = document.querySelectorAll(".product__add");//кнопка
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

//макет

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
//если есть такой элемент в корзине, вернет его
function searchCart(elems, dataId) {
   // console.log(elems.children)
    for (let elem of elems.children) {
        if (elem.dataset.id === dataId) {
            return elem;
        } 
    }
}
// конечная позиция
function endPositionElement(elem) {
    endPoint = {
        x: elem.left, 
        y: elem.top
    };   
}

//создание 
function addCart(event) {
    let product = event.target.closest(".product");//товар
    let dataId = product.dataset.id; 
    let pastValue = +product.querySelector(".product__quantity-value").innerText;
    let productImg = product.querySelector(".product__image")
    let imgSrc = productImg.getAttribute("src");

    let flyingImage = productImg.cloneNode(false); 
  
    let cart = searchCart(cartProduct, dataId);//товар найден
    // счетчик, начальные координаты
    if (cart !== undefined) {
        let cartProductCount = cart.querySelector(".cart__product-count");//счетчик в корзине
        let endPosition = cart.querySelector(".cart__product-image").getBoundingClientRect();//расположение эл.в корзине
        
        cartProductCount.innerText = +cartProductCount.innerText + pastValue; 
        endPositionElement(endPosition);// конечная позиция
        localStorage.setItem("cart", cartProduct.innerHTML);
        return;
    }

    //добавление в карзину в корзину
    cartProduct.insertAdjacentHTML("afterbegin", generateCartProduct(imgSrc, dataId, pastValue)); 
    
    //показывание карзины
    if (cartProduct.children) {
        document.querySelector(".cart").style.visibility = "visible"; 
    }  

    if(endPoint == undefined) {
        endPosition = cartProduct.querySelector(".cart__product-image").getBoundingClientRect();
        endPositionElement(endPosition);// конечная позиция
    }
    //передвижение элемента
    // начальная позиция
    const startPoint = {
        x: productImg.getBoundingClientRect().left, 
        y: productImg.getBoundingClientRect().top        
    }
    //console.log(startPoint);    

    flyingImage.style.position = 'fixed';//позиция и начальное расположение
    flyingImage.style.left = startPoint.x + 'px';
    flyingImage.style.top = startPoint.y + 'px';     
    document.querySelector('.cart').appendChild(flyingImage);// добавление в код
    animateElementToElement(flyingImage, endPoint, 7, 100);//функция повторения

    localStorage.setItem("cart", cartProduct.innerHTML);
}

//добавление
productAdd.forEach((el) => {
     el.addEventListener("click", addCart);
})

//функция рекурсия. Прощитывание движения
//nSteps шаги, tStep шаги
function animateElementToElement(elem, target, nSteps, tStep) {
    if (nSteps === 1) {
        elem.remove(); 
        return;   
    } 
    //новое текущее положение элемента
    const point = {
        x: elem.getBoundingClientRect().left, 
        y: elem.getBoundingClientRect().top    
    }
    //новое расстояние где старое положение - новое текущее  /
    point.x += (target.x - point.x) / nSteps;
    point.y += (target.y - point.y) / nSteps;
    //присваевании картинки новые координаты
    elem.style.left = point.x + 'px';
    elem.style.top = point.y + 'px';
    
    setTimeout(() => animateElementToElement(elem, target, nSteps - 1, tStep), tStep);
}

//удаление
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

