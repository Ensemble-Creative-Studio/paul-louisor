// utils.js
export const handleHeaderToggle = () => {
  const imageHeaderCol = document.querySelector(".imageHeaderCol");
  const contactBloc = document.querySelector(".contactBloc");

  if (imageHeaderCol) {
    imageHeaderCol.classList.toggle("transitionDown");
  }

  if (contactBloc) {
    contactBloc.classList.toggle("transitionUp");
  }
};
