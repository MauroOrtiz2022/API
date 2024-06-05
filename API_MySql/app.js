const express =require ("express");
const dotenv =require ("dotenv");
const  notFound =require ("./src/middlewares/notFound.js");
const  handleError  =require ("./src/middlewares/handleError.js");
const notesRoute =require ("./src/resources/notes/notes.routes.js");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

// api routes
app.use("/notes", notesRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});