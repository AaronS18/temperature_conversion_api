const express = require('express')
const { Sequelize } = require('sequelize');
const cors = require('cors');
const routes = require('./routes/index');
const db = require('./models');
const { questions } = require('./models');

// Init Express functionality
const app = express()
const port = 3000
app.use(async (req, res, next) => {
  req.context = {
    db,
  };
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route setup
app.use('/evaluation', routes.evaluation);

app.get('/', (req, res) => {
  res.send('Validate student Temperature Worksheets')
});


// Error handling.
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          message: err.message
      }
  });
});

// if you want to start a new DB from scratch set this value to true
const eraseDatabaseOnSync = true;

const createNewDB = async () => {
  await db.worksheets.create(
    {
      name: "WS0",
      student: "Student 0",
      questions: [
        {
          profValue: null,
          fromTemp: null,
          toTemp: null,
          studentResponse: null,
          answer: null,
      },
      ]
    },{
      include: [
        {
          model: questions, as: "questions"
       }
      ],
    }
  )
}
/** Sync models with db. */
db.sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if(eraseDatabaseOnSync){
    createNewDB();
  }
  app.listen(port, () =>
    console.log(`App listening on port ${port}!`)
  );
}).catch(err => {
  console.log(err);
});