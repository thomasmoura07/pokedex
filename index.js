import express from "express"
import path from "path"

const __dirname = path.resolve(path.dirname(''))

const app = express();

app.use(express.urlencoded({extended: true})) 
app.use(express.json()) 

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")));

const port = 3000 || 'https://pokedex-thomasmoura07.herokuapp.com/';
app.listen(port,() => {console.log(`rodando na porta ${port}`)});


const pokemons = [
    {
      id:1,
      nome:'Psyduck',
      descricao:"Psyduck is constantly beset by headaches. If the Pokémon lets its strange power erupt, apparently the pain subsides for a while.",
      tipo:"Water",
      img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png",
      altura:'0.8',
      peso:'19.6kg',
      categoria:'Duck',
      habilidade:'Damp'
    },
    {
      id:2,
      nome:'Charizard',
      descricao:"t spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
      tipo:"Fire",
      img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
      altura:'1.7',
      peso:'38kg',
      categoria:'Flame',
      habilidade:'Blaze'
    },
    {
      id:3,
      nome:'Meowth',
      descricao:"It loves to collect shiny things. If it’s in a good mood, it might even let its Trainer have a look at its hoard of treasures.",
      tipo:"Normal",
      img:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/052.png",
      altura:'0.4',
      peso:'4.2kg',
      categoria:'inseto',
      habilidade:'voar'
    }
  ]
  let message =''

//################ ROTAS ###############

app.get('/', (req,res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
    res.render("index.ejs",{pokemons,message}) 
    });

app.get('/detalhes/:id', (req, res) => {
    let pokedex
    pokemons.filter((element) => {
        if(element.id == req.params.id){
            pokedex = element;
        }
    })
    console.log(pokedex)
    res.render('detalhes.ejs',{pokedex,message})
})

app.get('/cadastro', (req,res) => {
  res.render("cadastro.ejs",{message}) 
  });

  app.post('/cadastro', (req, res) => {
    let i = pokemons[pokemons.length-1].id + 1
    const { nome,descricao,tipo,img,categoria,habilidade,altura,peso} = req.body
    pokemons.push({id: i, nome,descricao,tipo,img,categoria,habilidade,altura,peso })
    message = `Pokémon registrado com sucesso !`;
    console.log(pokemons)
    res.redirect('/')
})