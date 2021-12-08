const express = require("express")
const app = express()
const port = 5000
// je stock dans une variable les information de mon json
const translate = require('./translate.json')
// les 3 ligne pour faire fonctionner handlebars
const engine = require("express-handlebars").engine
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.use(express.static('public'));

app.get('/langage', (req, res) => {
    res.json(translate);
});

// on crée une route dynamique quon recupère pour afficher les valeur 
// des clef correspondante que j'ai passer comme des props dans le render
app.get("/:lang?", (req,res) => {
    // req.query permet de recupéré la valeur des clef url apres le ?
    // const {lang} = req.query
    let {lang} = req.params
    if(!lang || lang !== "fr" && lang !== "en" && lang !== "es" ){
        lang = "fr"
    }
    // console.log("valeur =>",lang);
    res.render('home',{
        fr:translate[lang].pageTitle,
        title:translate[lang].title,
        image:`/image/${lang}.jpg`
    } )
    

})


app.listen(port, () =>{
    console.log(`serveur en marche sur le port:${port}`);
})