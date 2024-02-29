import { readDatabase } from '../utils';

export class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const fields = await readDatabase(process.argv[2]);
      let message = 'This is the list of our students\n';
      Object.entries(fields).sort().forEach(([field, names]) => {
        message += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      });

      return res.status(200).send(message.trim());
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const fields = await readDatabase(process.argv[2]);
      const names = fields[major];
      return res.status(200).send(`List: ${names.join(', ')}`);
    } catch (error) {
      return res.status(500).send('Cannot load the database');
    }
  }
}
