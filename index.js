const express = require("express")
const app = express()
const port = 5000
// je stock dans une variable les information de mon json
const translate = require('./translate.json')
// les 3 ligne pour faire fonctionner handlebars
const engine = require("express-handlebars").engine
app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.get('/langage', (req, res) => {
    res.json(translate);
});


app.get("/:lang?", (req,res) => {
    // const {lang} = req.query
    let {lang} = req.params
    if(!lang || lang !== "fr" && lang !== "en" && lang !== "es" ){
        lang = "fr"
    }
    console.log("valeur =>",lang);
    res.render('home',{
        
        fr:translate[lang].pageTitle,
        title:translate[lang].title
    } )

})


app.listen(port, () =>{
    console.log(`serveur en marche sur le port:${port}`);
})