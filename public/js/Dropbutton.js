function myFunction(btn) {
  var dropdownContent = btn.nextElementSibling; // Obtiene el siguiente elemento (el contenido del dropdown)
  dropdownContent.classList.toggle("show");
}

// Cierra el dropdown si el usuario hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}