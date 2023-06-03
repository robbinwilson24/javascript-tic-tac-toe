const helpButton = document.querySelector(".helpButton");
const modalContainer = document.querySelector(".modalContainer");
const closePopUp = document.querySelector(".closePopUp");
const smileButton = document.querySelector(".smileButton");
const smileModal = document.querySelector(".smileModal");
const smileCloseButton = document.querySelector(".smileCloseButton");

helpButton.addEventListener("click", () => {
  modalContainer.style.display = "block";
  setTimeout(() => {
    modalContainer.classList.add("open");
  }, 10);
});

closePopUp.addEventListener("click", () => {
  modalContainer.classList.remove("open");
  setTimeout(() => {
    modalContainer.style.display = "none";
  }, 300);
});


smileButton.addEventListener("click", () => {
    smileModal.classList.add("show");
    setTimeout(() => {
        smileModal.classList.remove("show");
    }, 5000); 
});

smileCloseButton.addEventListener("click", () => {
    smileModal.classList.remove("show");
});



// references:
// https://www.youtube.com/watch?v=uUCpopjPZdI - This video that helped me correctly create a modal . 
