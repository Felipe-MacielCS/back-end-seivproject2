module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("course", {
    dept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_number: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'courses'
  });

  return Course;
};