let express = require("express");
let dotenv = require( "dotenv");
/*let { notFound } =require( "./src/middlewares/notFound.js");*/
/*let { handleError } =require( "./src/middlewares/handleError.js");*/
let notesRoute =require( "./recursos/alumnos/alumnos_routes.js");
let cors =require( "cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5000", // for vite application
  optionsSuccessStatus: 200,
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());

// api routes
app.use("/alumnos", notesRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Si jalo el puerto ${port}`);
});