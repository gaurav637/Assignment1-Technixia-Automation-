import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import methodOverride from 'method-override';
import { connectDatabase } from "./connectDB/connect.js";
// import { userRouter} from "../routes/userRouters.js";
import userRouter from "./routes/userRouters.js";
const app = express();
connectDatabase();
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.json());
app.set('view engine' , 'ejs');
app.set("views",path.resolve('./views'));
app.use(express.urlencoded({extended:false}));
app.get('/' , async (req,res) => {
    // console.log('user -> ',req.user);
    res.render('home');
});
    
app.get('/welcome',(req,res) => {
    res.render('welcome');

});
app.use('/user' , userRouter);

const PORT = process.env.PORT||8080;
app.listen(PORT, ()=> {
    console.log(`server is running at port ${PORT}`);
})