document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Loop: Validation
    const fields = ['name', 'age', 'weight', 'height'];
    let isValid = true;
    fields.forEach(field => {
        if (!document.getElementById(field).value) isValid = false;
    });

    if (!isValid) {
        alert('Please fill out all fields.');
        return;
    }

    const name = document.getElementById('name').value.trim();
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);

    let category, message, color;

    // Switch-case: Classify BMI
    switch (true) {
        case bmi < 18.5:
            category = 'Underweight'; color = '#5DADE2';
            message = 'Consider a balanced, calorie-sufficient diet.';
            break;
        case bmi < 25:
            category = 'Normal'; color = '#58D68D';
            message = 'Great! Keep up your healthy habits.';
            break;
        case bmi < 30:
            category = 'Overweight'; color = '#F5B041';
            message = 'Consider more physical activity.';
            break;
        default:
            category = 'Obese'; color = '#EC7063';
            message = 'We recommend consulting a healthcare provider.';
    }

    displayResult(name, bmi, category, message, color);
    recordSubmission({ name, weight, heightCm, bmi, category, sex: document.getElementById('sex').value, age: document.getElementById('age').value });
});

function displayResult(name, bmi, category, message, color) {
    const card = document.getElementById('resultCard');
    card.classList.remove('hidden');
    card.style.backgroundColor = color;
    card.innerHTML = `<h3>Hello, ${name}</h3><p>BMI: ${bmi} (${category})</p><p>${message}</p>`;
}

function recordSubmission(record) {
    fetch('AKfycbzlLBt75V4YhWiLUZRZKvSh92Azki4EORhkY81xxhbdfNkbNkiXxbSzDf2fbWUCrPn-', {
        method: 'POST',
        body: JSON.stringify(record)
    }).catch(err => console.error('Could not record submission:', err));
}