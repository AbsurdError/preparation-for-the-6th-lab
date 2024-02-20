let products = [
    {id: 1, title: 'Product1', description: 'Descriprtion1', price: 100},
    {id: 2, title: 'Product2', description: 'Descriprtion2', price: 200},
    {id: 3, title: 'Product3', description: 'Descriprtion3', price: 300},
    {id: 4, title: 'Product4', description: 'Descriprtion4', price: 400},
    {id: 5, title: 'Product5', description: 'Descriprtion5', price: 500},
    {id: 6, title: 'Product6', description: 'Descriprtion6', price: 600},
    {id: 7, title: 'Product7', description: 'Descriprtion7', price: 700},
    {id: 8, title: 'Product8', description: 'Descriprtion8', price: 800},
    {id: 9, title: 'Product9', description: 'Descriprtion9', price: 900},
    {id: 10, title: 'Product10', description: 'Descriprtion10', price: 1000},
];

let users = [
    {id:1, login: 'user1', password: '123', email: 'user1@email.ru'},
    {id:2, login: 'user2', password: '123', email: 'user2@email.ru'},
    {id:3, login: 'user3', password: '123', email: 'user3@email.ru'},
];

let carts = [
    {
        id: 1, 
        user_id: 1, 
        products: [{id: 8, title: 'Product8', description: 'Descriprtion8', price: 800}, {id: 7, title: 'Product7', description: 'Descriprtion7', price: 700}], 
        total_price: 300
    }
];

let isAuth = false;
let user_id = null;

let wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {

})

let header = document.createElement('header')
document.body.prepend(header);

let menu = document.createElement('ul');
menu.classList.add('menu');
header.prepend(menu);

// // Симуляция входа пользователя 1
// user_id = 1;
// isAuth = true;
// 

let li_login = document.createElement('li'),
    li_reg = document.createElement('li'),
    li_cart = document.createElement('li'),
    li_logout = document.createElement('li'),
    li_home = document.createElement('li');
    li_products = document.createElement('li')

function checkAuth(){
    if (isAuth){
        li_home.remove();
        li_reg.remove();
        li_login.remove();
        menu.append(li_home);
        menu.append(li_cart);
        menu.append(li_logout);
    } else {
        li_home.remove();
        li_cart.remove();
        li_logout.remove();
        menu.append(li_home);
        menu.append(li_reg);
        menu.append(li_login);
    }
}
checkAuth();

li_login.innerHTML = `<a href='/login' class='menu__item'>Login</a>`;
li_reg.innerHTML = `<a href='/registration' class='menu__item'>Registration</a>`;
li_home.innerHTML = `<a href='/' class='menu__item' onclick='showHome(event)'>Home</a>`;
li_logout.innerHTML = `<a href='/' class='menu__item' onclick='logout(event)'>Logout</a>`;
li_cart.innerHTML = `<a href='/cart' class='menu__item' onclick='showCart(event)'>Cart</a>`;
li_products.innerHTML = "<a href='#' class='menu__item'>Products</a>";

li_login.addEventListener('click', showLogin);
li_reg.addEventListener('click', showRegistration);
li_home.addEventListener('click', showHome);
li_logout.addEventListener('click', logout);
li_cart.addEventListener('click', showCart);
li_products.addEventListener('click', showProducts);

function login(event) {
    event.preventDefault();
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let registeredUser = users.find(user => user.login === login && user.password === password);
    if(registeredUser){
        isAuth = true;
        user_id = registeredUser.id;
        checkAuth();
        document.getElementById('login').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Вы ввели неверный логин или пароль');
    }
}

function showLogin (event) {
    event.preventDefault();
    let formLogin = document.createElement('form');
    formLogin.innerHTML = `
        <input type="text" id="login" placeholder="Login" required><br>
        <input type="password" id="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    `;
    wrap.innerHTML = '';
    wrap.appendChild(formLogin);
    formLogin.addEventListener('submit', login);
};

function showRegistration(event) {
    event.preventDefault();
    let formRegister = document.createElement('form');
    formRegister.innerHTML = `
        <input type="text" class="reg_login" id="reg-login" placeholder="Login" required><br>
        <input type="password" class="reg_password" id="reg-password" placeholder="Password" required><br>
        <input type="email" class="reg_email" id="reg-email" placeholder="Email" required><br>
        <button type="submit">Registration</button>
    `;
    wrap.innerHTML = '';
    wrap.appendChild(formRegister);
    formRegister.addEventListener('submit', register)
};

function register(event){
    event.preventDefault();
    let login = document.getElementById('reg-login').value;
    let password = document.getElementById('reg-password').value;
    let email = document.getElementById('reg-email').value;
    let nextUser = users.find(user => user.login === login);
    if(nextUser){
        alert('Пользователь с данным логином уже существует');
    } else {
        let newUserId = users.length + 1;
        users.push({id: newUserId, login: login, password: password, email: email});
        isAuth = true;
        user_id = newUserId;
        checkAuth();
        document.getElementById('reg-login').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('reg-email').value = '';
    }
}


function logout(event){
    event.preventDefault();
    isAuth = false;
    user_id = null;
    checkAuth()
};




function showHome(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row)
    if (isAuth == true){
        products.forEach(product => {
            row.insertAdjacentHTML('beforeend',
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} Руб. </p>
                <button class='btn' data-product-id='${product.id}'>Добавить в корзину</button>
            </div>`
            )
        });
    } else if(isAuth == false){
        products.forEach(product => {
            row.insertAdjacentHTML('beforeend',
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} Руб. </p>
            </div>`
            )
        });
    }

    // let productsShow = products.map(product => {
    //     return row.insertAdjacentHTML('beforeend',
    //     `<div class='product__card'>
    //         <h4 class='title'> ${product.title}</h4>
    //         <p class='description'> ${product.description}</p>
    //         <p class='price'> ${product.price} Руб. </p>
    //         <button class='btn'>Add to Cart</button>
    //     </div>`
    //     )
    // })

    let btns = row.querySelectorAll('.btn');
    for (let i=0; i<btns.length; i++){
        let btn = btns[i];
        btn.addEventListener('click', () => {
            if (user_id){
                let IndexCart = carts.findIndex(cart => cart.user_id === user_id);
                if (IndexCart !== -1) {
                    carts[IndexCart].products.push(products[i]);
                } else {
                    carts.push({id: carts.length + 1, user_id: user_id, products: [products[i]]});
                }
            }
            console.log(carts);
        });
    }
};


// function showCart(event){
//     event.preventDefault();
//     wrap.innerHTML = '';
//     console.log(carts)
//     let total = 0;
//     let row = document.createElement('div');
//     row.classList.add('cart__row');
//     wrap.append(row)
//     carts.forEach(cart => {
//         row.insertAdjacentHTML('beforeend', 
//         `<div class='cart__card'>
//             <h4 class='cart__title'> ${cart.product.title}</h4>
//             <p class='cart__price'> ${cart.product.price} Руб. </p>
//         </div>`);
//         total += cart.product.price;
//     })
//     wrap.insertAdjacentHTML('afterend',
//     `<div class='total__price'> 
//         <h4> Общая стоимость </h4>
//         <p> ${total} Руб.</p>
//     </div>
//     `)
// }

function showCart(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let total = 0;
    let row = document.createElement('div');
    row.classList.add('cart__row');
    wrap.append(row);
    let userCart = carts.find(cart => cart.user_id === user_id);
    if (userCart) {
        userCart.products.forEach(product => {
            row.insertAdjacentHTML('beforeend', 
            `<div class='cart__card'>
                <h4 class='cart__title'> ${product.title}</h4>
                <p class='cart__price'> ${product.price} Руб. </p>
            </div>`);
            total += product.price;
        });
    }
    let prevTotal = document.querySelector('.total__price');
    if(prevTotal) {
        prevTotal.remove();
    }
    wrap.insertAdjacentHTML('afterend',
    `<div class='total__price'> 
        <h4> Общая стоимость </h4>
        <p> ${total} Руб.</p>
    </div>
    `);
};



function showProducts(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row);
    products.forEach(product => {
        row.insertAdjacentHTML('beforeend',
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} Руб. </p>
                <button class='btn' data-product-id='${product.id}'>Добавить в корзину</button>
            </div>`
        );
    });
    let btns = row.querySelectorAll('.btn');
    for (let i=0; i<btns.length; i++){
        let btn = btns[i];
        btn.addEventListener('click', () => {
            if (user_id){
                let IndexCart = carts.findIndex(cart => cart.user_id === user_id);
                if (IndexCart !== -1) {
                    carts[IndexCart].products.push(products[i]);
                } else {
                    carts.push({id: carts.length + 1, user_id: user_id, products: [products[i]]});
                }
                console.log(carts);
            }
        });
    }
}