// console.log('sanju')
const singInBtn = document.getElementById("signIn-btn")
.addEventListener("click",function (){
    const nameInput = document.getElementById("input-name");
    const nameValue = nameInput.value;
    // console.log(nameValue)
    const passInput = document.getElementById("input-pass");
    const passValue = passInput.value;
    // console.log(passValue);
    if(nameValue === "admin" && passValue === "admin123"){
        alert("login successful");
        window.location.assign("./home.html");
    }else{
        alert("login error");
    }
})

// window.location.assign("./home.html")

















