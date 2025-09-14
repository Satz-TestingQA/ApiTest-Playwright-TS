**PLAYWRIGHT-TS-CUCUMBER/Playwright Test Automation **

PolstarQA
PLAYWRIGHT-TS-CUCUMBER is a testing framework for performing automated UI, API, and performance testing using Playwright, Cucumber, and k6.


**Overview**
This document outlines the Playwright Test Automation framework used for testing both the UI and API. It includes an explanation of the setup, test strategy, structure, and how results and screenshots are managed in the reports.

**Tools and Libraries**
Playwright: A Node.js library for automating web browsers, used for UI testing.
Cucumber: A behavior-driven development (BDD) testing framework, used for UI testing.
k6: A performance testing tool that allows testing APIs and web applications under load.
Axios: A promise-based HTTP client used for API testing.

**Framework Structure**
The framework uses Playwright for browser automation and Cucumber for behavior-driven development (BDD). It consists of the following components:

API Tests - These are responsible for testing the backend of the application using HTTP requests.
UI Tests - These focus on testing the frontend of the application by interacting with the website in a real browser.
Performance Tests - These are used for load and stress testing via k6.
Report Generation - The framework generates detailed reports after every test run, including failure/passed logs and screenshots to assist in debugging.

**Prerequisites**
To get started with this project, you need to have the following installed on your system:

Node.js (Version 14.x or higher): Download and install Node.js
npm: Comes with Node.js.
k6: For running performance tests, install k6 from k6.io.
Git: For version control, install Git from git-scm.com.


**Clone the Repository**
To clone the repository and set up the project, follow these steps:

Open a terminal and run the following command: git clone https://github.com/Muskan-Kumari013/Playwright-TS-Cucumber.git

**Test Strategy**

UI Tests:
⦁	UI tests interact with the application’s UI through Playwright's browser automation.
⦁	These tests are designed to validate the user experience, ensuring the correct page content is displayed and interactions are functioning as expected.
API Tests:
⦁	API tests use HTTP requests to interact with the backend, validating the functionality and correctness of API endpoints.
Performance Tests:
⦁	Performance tests use k6 to simulate load and stress on the application to ensure it performs well under heavy traffic.
Test Execution:
⦁	UI and API tests are executed separately, as defined in the GitHub Actions CI pipeline.

**GitHub Actions CI/CD Workflow**

The CI/CD pipeline in GitHub Actions is defined in the playwright.yml file. The key steps are:
Checkout code: The latest code is fetched from the GitHub repository.
Set up Node.js: The required Node.js version is set up for the environment.
Install dependencies: Dependencies are installed via npm ci for a clean and fast installation.
Install Playwright Browsers: Playwright is installed with the necessary browsers using npx playwright install --with-deps.
Run UI Tests: The npm run test_ui script executes the UI tests.
Run API Tests: The npm run test_api script executes the API tests.
Upload reports and screenshots: After the tests, the results (including HTML reports) are uploaded as artifacts for further analysis.

**Test Execution & Reporting**
**Test Execution**

**Run UI Tests:**
The UI tests are executed using Playwright and Cucumber to test the frontend functionality.
To run the UI tests, use the following command:
--npm run test_ui
This command will execute all the UI test cases defined in the features/ folder under the UI test suite. It runs through different browsers and generates a detailed report, capturing all the necessary test steps and failures.

**Run API Tests:**

The API tests are executed to test the backend API endpoints.
To run the API tests, use the following command:
--npm run test_api
This command will execute all the API test cases defined in the features/ folder under the API test suite. The tests interact with the backend and validate the correctness and expected behavior of the API endpoints.

**Run Performance Tests:**

The performance tests are executed using k6 to test how the application behaves under load and stress.
To run the performance tests, use the following command:
--npm run test_performance
This command will execute performance test scripts defined in the src/test/k6/ folder. The tests simulate a certain number of users interacting with the application and measure the performance metrics.


**Test Reports:**

After each test execution, the results are saved in HTML format for easy viewing:
UI Test Report: reports/ui/cucumber-ui-report.html
API Test Report: reports/api/cucumber-api-report.html

**Screenshots:**

Screenshots are automatically captured during test execution, to help visualize the state of the application. Screenshots are taken after each test steps. The screenshots are saved to the reports/screenshots/ folder.

**Artifacts Upload:**

After test execution, the results (including the HTML reports and screenshots) are uploaded as artifacts to GitHub Actions, where they can be easily accessed:
UI Test Report: reports/ui/cucumber-ui-report.html
API Test Report: reports/api/cucumber-api-report.html
Screenshots and Logs: These are saved under reports/screenshots/.







