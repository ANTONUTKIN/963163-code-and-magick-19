'use strict';

// Функция показа и скрытия диалогового окна настроек персонажа и отправки данных на сервер

(function () {
  var userDialog = document.querySelector('.setup');
  var playerIcon = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Отправка данных на сервер
  var form = userDialog.querySelector('.setup-wizard-form');
  var onSuccess = function () {
    userDialog.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(window.backend.POST_URL, onSuccess, window.util.errorHandler, new FormData(form));
  });

  playerIcon.addEventListener('click', function () {
    openPopup();
  });

  playerIcon.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
