const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

router.post('/calculate-bmi', (req, res) => {
  const { weight, height } = req.body;
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  // Проверка на корректность введенных данных
  if (isNaN(weightNum) || weightNum <= 0 || isNaN(heightNum) || heightNum <= 0) {
    // Если одно из значений некорректно, перенаправляем на error.html
    return res.sendFile(path.join(__dirname, 'frontend', 'error.html'));
  }

  // Преобразование роста в метры, если введен в сантиметрах
  const heightInMeters = heightNum / 100;

  // Расчет BMI
  const bmi = (weightNum / (heightInMeters ** 2)).toFixed(2);

  let category = '';
  let color = '';

  // Логика для определения категории BMI
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'blue';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal';
    color = 'green';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'yellow';
  } else if (bmi >= 30) {
    category = 'Obese';
    color = 'red';
  }

  // Перенаправление на страницу с результатами
  res.redirect(`/result.html?bmi=${bmi}&category=${category}&color=${color}`);
});

module.exports = router;
