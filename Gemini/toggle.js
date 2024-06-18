
let checkbox=document.querySelector(".checkbox");
console.log(checkbox.checked);
checkbox.addEventListener("click",()=>{
    if(checkbox.checked){
        window.location.href="index.html";
    }
    else{
        window.location.href="chatgpt.html";
    }
})