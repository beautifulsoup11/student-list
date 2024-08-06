const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let studentList = [];

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/students', (req, res) => {
    res.json(studentList);
});

app.post('/students', (req, res) => {
    const { name, number } = req.body;
    if (studentList.length >= 5) {
        return res.status(400).json({ message: "명단이 가득 찼습니다." });
    }
    studentList.push({ name, number });
    res.status(201).json({ message: "학생이 추가되었습니다." });
});

app.delete('/students', (req, res) => {
    studentList = [];
    res.json({ message: "명단이 초기화되었습니다." });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
