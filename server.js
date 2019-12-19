// importar os módulos
const express = require('express');
const fs = require("fs");


require('dotenv').config()

// iniciar o objeto do express
const app = express();

// Escolhendo a porta do servidor
const port = 3000;
// setando o local a onde vai ficar os arquivos da views
app.set('views', __dirname + '/views');
/*
console.log(process.env.ENGINE)

switch(process.env.ENGINE){
    case 'react':

        // setando as variáveis 'view engine'
        ///app.set('view engine', 'jsx');
        const { createEngine } = require('express-react-views');
        app.engine('jsx', createEngine());
        break

    case 'liquid':
        var { Liquid } = require('liquidjs');
        var engine = new Liquid();
        app.engine('liquid', engine.express());
        break
}
*/

        app.set('view engine', 'jsx');

        const { createEngine } = require('express-react-views');
        app.engine('jsx', createEngine());


        const { Liquid } = require('liquidjs');
        const engine = new Liquid();
        app.engine('liquid', engine.express());




        /*
        const expressVue = require('express-vue');

        //Optional if you want to specify the components directory separate to your views, and/or specify a custom layout.
        app.set('vue', {
            //ComponentsDir is optional if you are storing your components in a different directory than your views
            componentsDir: __dirname + '/components',
            //Default layout is optional it's a file and relative to the views path, it does not require a .vue extension.
            //If you want a custom layout set this to the location of your layout.vue file.
            defaultLayout: 'layout'
        });
        app.engine('vue', expressVue);
*/


const enginesExtensions = ['jsx', 'liquid', 'vue']

const customRender = (res, fileName) =>{
    enginesExtensions.forEach(extension => {
        let file = `${fileName}.${extension}`

        fs.exists(`${app.get('views')}/${file}`,function(exists){
            if(exists){
                res.render(file)
            }
        })
        
    });
}


app.get('/', (req, res, next) => {
    customRender(res, 'index')
 //res.render('index');
});


// parametrizar a porta de escuta
app.listen((process.env.PORT || port), () => console.log(`\uD83C\uDF0F runing at http://localhost${port}`));