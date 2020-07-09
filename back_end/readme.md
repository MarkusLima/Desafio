Iniciando construção de Api Rest
09/07/2020

Tecnologias usadas:
NodeJS
JavaScript
MongoDb Atlas

Bibliotecas:
express 
body-parser 
mongoose
nodemon
cors


Desc: Uso banco de dados Disponivel: https://cloud.mongodb.com/
senha: adm@Mk

Rotas de Acesso:

get - localhost:3000/api  no body

get - localhost:3000/api/:id params id

delete - localhost:3000/api/:id params id

post - localhost:3000/api
{
	"nomeCliente": "John",
   "dataEntrega": "09/07/2020",
   "pontoPartida": "Centro",
   "pontoDestino": "Pilares"
}

patch - localhost:3000/api/:id 
{
	"nomeCliente": "John",
   "dataEntrega": "09/07/2020",
   "pontoPartida": "Centro",
   "pontoDestino": "Pilares"
}
