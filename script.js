function showSignup() {
    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
        anime({
        targets: loginSection,
        translateX: [-300, 0],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: function () {
            loginSection.classList.add('hidden');
            signupSection.classList.remove('hidden');
            anime({
                targets: signupSection,
                translateX: [300, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }
    });
}
let loginsign=document.querySelector(".loginsignup");
let ctabutton=document.querySelector(".cta-button");
let container=document.querySelector(".container");
container.style.display="none";
let section1=document.querySelector(".section1");

ctabutton.addEventListener("click",()=>{
    if(container.style.display=="none"){
        container.style.display="block";
        section1.style.display="none"
    }
    else{
        container.style.display="none";
        section1.style.display="block"
    }
})
loginsign.addEventListener("click",()=>{
    if(container.style.display=="none"){
        container.style.display="block";
        section1.style.display="none"
    }
    else{
        container.style.display="none";
        section1.style.display="block"
    }
})

function showLogin() {
    const signupSection = document.getElementById('signup-section');
    const loginSection = document.getElementById('login-section');

    anime({
        targets: signupSection,
        translateX: [300, 0],
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
        complete: function () {
            signupSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            anime({
                targets: loginSection,
                translateX: [-300, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeInOutQuad'
            });
        }
    });
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const phone = document.getElementById('signup-phone').value;
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    if (name && phone && email && username && password) {
        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Sign up successful! Please log in.');
        showLogin();
    } else {
        alert('Please fill in all fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    
    if (username === storedUsername && password === storedPassword) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password.');
    }
}

function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

function checkLogin() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
        window.location.href = 'index.html';
    }
}

function animateDashboard() {
    anime({
        targets: '.dashboard-container h1',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutBounce'
    });

    anime({
        targets: '.dashboard-container button',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 500,
        easing: 'easeOutBounce'
    });
}
