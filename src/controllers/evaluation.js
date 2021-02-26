const db = require('../models');
const helperMethods = require('../helpers/helpermethods');
const { questions } = require('../models');

const Worksheet = db.worksheets;
const Question = db.questions;

// Fetches all posts for a collection.
let getWorksheet = async (req, res) => { 
    let questions;
    const worksheet = req.params.worksheet.toLowerCase();
    const studentName = req.params.student.toLowerCase();
    const worksheetData = await Worksheet.findAll({
        raw: true,
        where: {
            name: worksheet,
            student: studentName,
        },
        }
    ).then(async (worksheetData) => {
        questions = await Question.findAll({
            raw: true,
            where: {
                worksheetId: worksheetData[0].id,
            },
        }).then((questions)=> {
            helperMethods.printWorkSheet(questions, worksheetData);
            res.status(200).json({
                message: questions,
            });
        })
    });
    
};

// Creates new post entry
let postNewWorksheet = async (req, res, next) => { 

    const workSheetQuestions = req.body.questions;
    helperMethods.getAnswer(workSheetQuestions);
    
    await Worksheet.create(
        {
            name: req.body.name.toLowerCase(),
            student: req.body.student.toLowerCase(),
            questions: req.body.questions
        },
        {
        include: [
            { model: Question, as: "questions" }
        ],
        }
    ).then(()=> {
        res.status(200).json({
            message: 'Success !',
        });
    })   
};

exports.getWorksheet = getWorksheet;
exports.postNewWorksheet = postNewWorksheet;