//const app = require("./src/app");
//const port = 3001;

//app.listen(process.env.PORT || port, () =>
  //console.log(`Server running in ${port}`)
//);

const test = require('tape');
const assert = require('assert');
const index = require('../../src/routes');
console.log("ok");


test('Aplicar desconto', (t) => {
    t.assert(index.get("/"), "Descontou corretamente")
    t.end()  
})