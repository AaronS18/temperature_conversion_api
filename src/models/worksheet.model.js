
module.exports = (sequelize, DataTypes) => {
  const Worksheet = sequelize.define("worksheet", {
    name: {
      type: DataTypes.STRING
    },
    student: {
      type: DataTypes.STRING
    }
  });

  return Worksheet;
};