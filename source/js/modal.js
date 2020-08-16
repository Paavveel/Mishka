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
