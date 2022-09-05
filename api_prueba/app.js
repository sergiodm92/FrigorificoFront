const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('welcome to my api')
})

app.get('/products', (req, res) => {

    res.json(array)

})


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));



