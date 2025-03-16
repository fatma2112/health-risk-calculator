# Health Insurance Risk Calculator

## What is this?
This is a web app. It helps calculate health risks for insurance customers based on their age, height, weight, blood pressure, and family health history. I worked with a team using Scrum and deployed it on Azure.

## How it Works
- You enter your details (like age and weight) in a form.
- The app checks if the inputs are okay (e.g., height must be at least 60 cm).
- It shows a summary of what you entered.
- Then it tells you your risk level (low, moderate, high, or uninsurable) with a score.

## Tools Used
- **Front end**: HTML, CSS, and JavaScript
- **Back end**: Node.js and Azure Functions
- **Version control**: GitHub
- **Hosting**: Azure Static Web Apps


## How to Run it Locally

### Clone the repository  
```bash
git clone https://github.com/fatma2112/health-risk-calculator.git
cd health-risk-calculator
```

### Start the API  
```bash
cd api
func start
```

### Start the website  
```bash
cd client
http-server -p 8080
```

Now, open `http://localhost:8080` in your browser to use the app.
