const express = require('express')
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());


app.post('/proxy', async (req, res) => {

    if(req.body.method === "GET"){
        try {
            const response = await axios.get(req.body.api);
            res.json(response.data); 
    
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }else{
        try {
            const response = await axios.post(req.body.api, req.body.query);
            res.json(response.data); 
    
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})