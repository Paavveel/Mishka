// Берём кнопки
var btnNext = document.querySelector(".reviews__button-next");
var btnPrev = document.querySelector(".reviews__button-prev");
// Берём слайды
var slides = document.querySelectorAll(".slider__item");
console.log(btnPrev);
// Объявляем переменную i
var i = 0;

// Объявляем событие нажатия на кнопку вперёд
btnNext.addEventListener("click", function () {
  // Увеличиваем переменную i
  ++i;
  // Условие если переменная i больше или равна количеству слайдов
  if (i >= slides.length) {
    // Удаляем класс active предыдущему слайду
    slides[i - 1].classList.remove("slider__item--active");
    // Присваиваем переменной i ноль
    i = 0;
    // Добавляем класс active следующему слайду
    slides[i].classList.add("slider__item--active");
  } else {
    // Удаляем класс active предыдущему слайду
    slides[i - 1].classList.remove("slider__item--active");
    // Добавляем класс active следующему слайду
    slides[i].classList.add("slider__item--active");
  }
});

// Объявляем событие нажатия на кнопку назад
btnPrev.addEventListener("click", function () {
  // Уменьшаем переменную i
  --i;
  //  console.log("Начало" + i);
  // Условие если переменная i меньше indexa 0
  if (i < 0) {
    // Удаляем класс active первому слайду
    slides[i + 1].classList.remove("slider__item--active");
    // Присваиваем переменной i длину слайдов - 1
    i = slides.length - 1;
    // console.log("Конец" + i);
    // Добавляем класс active последнему слайду
    slides[i].classList.add("slider__item--active");
  } else {
    // Удаляем класс active текущему слайду
    slides[i + 1].classList.remove("slider__item--active");
    // Добавляем класс active предыдущему слайду
    slides[i].classList.add("slider__item--active");
  }
});
