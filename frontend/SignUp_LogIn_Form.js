const container = document.querySelector('.container');
const registerBtnActive = document.querySelector('.register-btn');
const loginBtnActive = document.querySelector('.login-btn');

registerBtnActive.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtnActive.addEventListener('click', () => {
    container.classList.remove('active');
})


const loginBtn = document.querySelector('.btn');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // chặn reload form
    window.location.href = "../index.html"; // chuyển sang trang khác
});

