// Mobile Navigation

var nav = document.querySelector(".main-nav");
var navToggle = document.querySelector(".page-header__toggle");

if (nav) {
  nav.classList.remove("main-nav--no-js");
}

if (navToggle) {
  navToggle.classList.remove("page-header__toggle--no-js");
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
  var mOpen = document.querySelectorAll("[data-modal]");

  if (mOpen.length == 0) return;

  var overlay = document.querySelector(".modal__overlay");
  var mClose = document.querySelectorAll("[data-close]");
  var mBody = document.querySelector(".modal__body");
  var size = mBody.querySelector("[name=product-size]");
  var mStatus = false;

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
(function () {
  var btnNext = document.querySelector(".reviews__button-next");
  var btnPrev = document.querySelector(".reviews__button-prev");
  // Берём слайды
  var slides = document.querySelectorAll(".slider__item");

  // console.log(btnPrev);

  if (!btnNext) return;

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
})();

// Валидация телефона

(function () {
  if (!document.querySelector(".form__tel")) {
    return;
  }

  window.addEventListener("DOMContentLoaded", function () {
    function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function mask(event) {
      var matrix = "+7 ___ ___ __ __",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });

      if (event.type == "blur") {
        if (this.value.length == 2) this.value = "";
      } else setCursorPosition(this.value.length, this);
    }
    var input = document.querySelector("#tel");
    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
  });
})();
