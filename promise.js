const fetch = require('node-fetch');
fetch('https://www.yandex.ru')
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    // ...и здесь содержимое полученного файла
    console.log(text.length) // {"name": "iliakan", isAdmin: true}
  });


  // fetch('https://google.com')
  //       .then(res => res.text())
  //       .then(text => console.log(text.length))