// Mobile Navigation

var nav = document.querySelector(".main-nav");
var navToggle = document.querySelector(".page-header__toggle");

if (nav) {
  nav.classList.remove("main-nav--no-js");
}

if (navToggle) {
  navToggle.addEventListener("click", function (e) {
    e.preventDefault();
    nav.classList.toggle("main-nav--open");
    navToggle.classList.toggle("page-header__toggle--active");
  });
}

// Modal

(function () {
  var overlay = document.querySelector(".modal__overlay"),
    mOpen = document.querySelectorAll("[data-modal]"),
    mClose = document.querySelectorAll("[data-close]"),
    mBody = document.querySelector(".modal__body"),
    size = mBody.querySelector("[name=product-size]"),
    mStatus = false;

  if (mOpen.length == 0) return;

  [].forEach.call(mOpen, function (el) {
    el.addEventListener("click", function (e) {
      var modalId = el.getAttribute("data-modal"),
        modal = document.getElementById(modalId);

      modalShow(modal);
    });
  });

  [].forEach.call(mClose, function (el) {
    el.addEventListener("click", modalClose);
  });

  document.addEventListener("keydown", modalClose);

  function modalShow(modal) {
    overlay.classList.remove("modal__overlay--close");
    overlay.classList.add("modal__overlay--show");

    modal.classList.remove("modal__body--close");
    modal.classList.add("modal__body--show");

    size.focus();

    mStatus = true;
  }

  function modalClose(event) {
    if (mStatus && (!event.keyCode || event.keyCode === 27)) {
      var modals = document.querySelectorAll(".modal__body");

      [].forEach.call(modals, function (modal) {
        modal.classList.remove("modal__body--show");
        modal.classList.add("modal__body--close");
      });

      overlay.classList.remove("modal__overlay--show");
      overlay.classList.add("modal__overlay--close");
      mStatus = false;
    }
  }
})();

// Slider

// Берём кнопки
var btnNext = document.querySelector(".reviews__button-next");
var btnPrev = document.querySelector(".reviews__button-prev");
// Берём слайды
var slides = document.querySelectorAll(".slider__item");
// console.log(btnPrev);
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
