document.getElementById('riskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      age: parseInt(form.age.value),
      height: parseFloat(form.height.value),
      weight: parseFloat(form.weight.value),
      systolic: parseInt(form.systolic.value),
      diastolic: parseInt(form.diastolic.value),
      history: Array.from(form.history).filter(h => h.checked).map(h => h.value)
    };
  
    const resultDiv = document.getElementById('result');
    if (data.height < 60) {
      resultDiv.innerText = "Error: Height must be at least 60 cm.";
      return;
    }
    if (data.age < 0 || data.weight <= 0 || data.systolic <= 0 || data.diastolic <= 0) {
      resultDiv.innerText = "Error: Age, weight, and blood pressure must be positive.";
      return;
    }
  
    resultDiv.innerText = `Summary:\nAge: ${data.age}\nHeight: ${data.height} cm\nWeight: ${data.weight} kg\nBlood Pressure: ${data.systolic}/${data.diastolic} mmHg\nFamily History: ${data.history.length ? data.history.join(", ") : "None"}`;
  
    try {
      const res = await fetch('http://localhost:7071/api/calculateRisk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      resultDiv.innerText += `\n\nRisk: ${result.category} (${result.totalScore} points)`;
    } catch (error) {
      resultDiv.innerText = "Error: Unable to calculate risk. Please try again.";
    }
  });