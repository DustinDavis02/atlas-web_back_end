const express = require('express');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
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

    let message = `Number of students: ${students.length}\n`;
    Object.entries(fields).forEach(([field, { count, names }]) => {
      message += `Number of students in ${field}: ${count}. List: ${names.join(', ')}\n`;
    });

    return message.trim();
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const message = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${message}`);
  } catch (error) {
    res.status(500).send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
