module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    profValue: {
      type: DataTypes.FLOAT
    },
    fromTemp: {
      type: DataTypes.STRING
    },
    toTemp: {
      type: DataTypes.STRING
    },
    studentResponse: {
      type: DataTypes.FLOAT
    },
    answer:{
      type: DataTypes.STRING
    }
    
  });

  return Question;
};