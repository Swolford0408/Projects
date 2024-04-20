const toggle = document.querySelector('#btnToggleMenu');

toggle.addEventListener("click", function(){
    document.querySelector('#sidebar').classList.toggle("expand");
})