module.exports = async function (context, req) {
    if (req.method === "OPTIONS") {
      context.res = {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "https://icy-ocean-0eedbbc0f.6.azurestaticapps.net",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400"
        }
      };
      return;
    }
  
    const { age, height, weight, systolic, diastolic, history } = req.body;
    let totalScore = 0;
  
    totalScore += age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;
  
    const bmi = weight / ((height / 100) ** 2);
    totalScore += bmi >= 18.5 && bmi <= 24.9 ? 0 : bmi <= 29.9 ? 30 : 75;
  
    if (systolic < 120 && diastolic < 80) totalScore += 0;
    else if (systolic <= 129 && diastolic < 80) totalScore += 15;
    else if ((systolic <= 139 || diastolic <= 89) && !(systolic > 180 || diastolic > 120)) totalScore += 30;
    else if (systolic <= 180 && diastolic <= 120) totalScore += 75;
    else totalScore += 100;
  
    if (history.includes("diabetes")) totalScore += 10;
    if (history.includes("cancer")) totalScore += 10;
    if (history.includes("alzheimers")) totalScore += 10;
  
    const category = totalScore <= 20 ? "low risk" : totalScore <= 50 ? "moderate risk" : totalScore <= 75 ? "high risk" : "uninsurable";
  
    context.res = {
      status: 200,
      headers: {
        // Replace existing CORS header
        "Access-Control-Allow-Origin": "https://icy-ocean-0eedbbc0f.6.azurestaticapps.net",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      },
      body: { totalScore, category }
    };
  };