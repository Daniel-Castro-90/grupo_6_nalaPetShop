window.addEventListener("load", function () {
    
    // Alguna animación

    // Sistema de notificaciones, puede ser toastr

    // 

    let btnBuy = document.querySelectorAll(".add_cart");

    btnBuy.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            console.log(e.target)
        });
    });
});
