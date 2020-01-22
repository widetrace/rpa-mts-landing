(function(exports) {
  function valOrFunction(val, ctx, args) {
    if (typeof val == "function") {
      return val.apply(ctx, args);
    } else {
      return val;
    }
  }

  function InvalidInputHelper(input, options) {
    input.setCustomValidity(
      valOrFunction(options.defaultText, window, [input])
    );

    function changeOrInput() {
      if (input.value == "") {
        input.setCustomValidity(
          valOrFunction(options.emptyText, window, [input])
        );
      } else {
        input.setCustomValidity("");
      }
    }

    function invalid() {
      if (input.value == "") {
        input.setCustomValidity(
          valOrFunction(options.emptyText, window, [input])
        );
      } else {
        input.setCustomValidity(
          valOrFunction(options.invalidText, window, [input])
        );
      }
    }

    input.addEventListener("change", changeOrInput);
    input.addEventListener("input", changeOrInput);
    input.addEventListener("invalid", invalid);
  }
  exports.InvalidInputHelper = InvalidInputHelper;
})(window);

InvalidInputHelper(document.querySelector("#name"), {
  defaultText: "Пожалуйста, введите свое имя!",
  emptyText: "Пожалуйста, введите свое имя!",
  invalidText: function(input) {
    return "Кажется, вы ничего не ввели!";
  }
});

InvalidInputHelper(document.querySelector("#email"), {
  defaultText: "Пожалуйста, введите e-mail для связи с вами!",
  emptyText: "Пожалуйста, введите e-mail для связи с вами!",
  invalidText: function(input) {
    return `Введенный вами e-mail (${input.value}) неправильный!`;
  }
});

InvalidInputHelper(document.querySelector("#tel"), {
  defaultText: "Пожалуйста, введите свой номер телефона!",
  emptyText: "Пожалуйста, введите свой номер телефона!",
  invalidText: function(input) {
    return "Кажется, вы ничего не ввели!";
  }
});
