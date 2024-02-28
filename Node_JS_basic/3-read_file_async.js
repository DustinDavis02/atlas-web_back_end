const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, { encoding: 'utf8' })
    .then((data) => {
      const lines = data.split('\n').filter(Boolean);
      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const [firstname, , , field] = student.split(',');

        if (!fields[field]) {
          fields[field] = { count: 0, names: [] };
        }

        fields[field].count += 1;
        fields[field].names.push(firstname);
      });

      console.log(`Number of students: ${students.length}`);

      Object.entries(fields).forEach(([field, { count, names }]) => {
        console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;
