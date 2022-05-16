// *$(window).load(function() {
 
//   $(".loader_inner").fadeOut();
//   $(".loader").delay(400).fadeOut("slow");
 
// });

const loader = document.querySelector('.loader');
console.log(loader);
window.addEventListener('load', () => {
  loader.classList.add('visually-hidden');
  setTimeout(() => {
    loader.remove();
  }, 600);
});
