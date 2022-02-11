const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const {notFound,errorHandler} = require('./middlewares/errorMiddleware');
const app = express();
const path = require('path')
dotenv.config();
connectDB();
app.use(express.json())


app.use('/api/users',userRoutes);

//-----deploy---
__dirname = path.resolve()
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"frontend/build")));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
    })
}else{
    app.get('/',(req,res) =>{
        res.send('API is running');
    });
}
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on PORT ${PORT}`));