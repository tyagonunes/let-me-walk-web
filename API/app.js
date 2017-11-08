var app = require('./config/app_config');
var db =  require('./config/db_config');
var Local = require('./models/local');
var localController = require('./controllers/localController');


// LISTAR LOCAIS
app.get('/', function(req, res) {
	res.end('Bem vindo a API');	
});



app.get('/locais', function(req, res) {
	localController.list(function(resp){
		res.json(resp);
	});
});


// BUSCAR LOCAL POR ID

app.get('/locais/:id', function(req, res){

	var id = req.param.id;

	Local.findById(id, function(error, locais){
		if(error) {
			res.json({error: 'Não foi possivel encontrar local'});
		}
		else {
			res.json(locais)
		}
	});
});

// SALVAR LOCAL

app.post('/locais', function(req, res){

	var nome = req.body.Nome;
	var latitude = req.body.Latitude;
	var longitude = req.body.Longitude;
	var tipo = req.body.Tipo;
	var descricao = req.body.Descricao;
	var acessos = req.body.Acessos;

	localController.save(nome, latitude, longitude, tipo, descricao, acessos, function (resp) {
		res.json(resp);
	})

});


// DELETAR LOCAL

app.delete('/locais/:id', function(req, res){

	var id = req.params['id'];
	

	localController.delete(id, function (resp) {
		res.json(resp);
	})

});