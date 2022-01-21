**FraudDetectionApp helps fraud officers to detect whether the particular transaction and its connected transactions are fraudulant or not. If found to be fraudulant, then they can stop delivery or change payment method.**

FraudDetectionApp is written in typescript with runtime node.js using visual studio nodejs-typescript webapp template.
For basic views - PUG is used with very basic CSS properties.
Currently it exposes basic GET 'API' to get the all the transactions related to specified transactionId and ConfidenceLevel.

This application is hosted on Azure. Access the deployed app using the below URL.

https://recruitment@riskident.com 

**Important Note: The above URL will redirect to risk ident official website. This issue might be because of the Risk Ident's App gateway redirecting any requests
containing the domain as @riskident to actual app rather than deployed one!!).**

So better use the below one.

https://riskident-frauddetection.azurewebsites.net


## Steps to build and debug the application**

### Prerequisites
- [Git] to clone the project from github(https://github.com/varalakshmi7991/RISKIDENT.git)
- [Visual Studio](https://visualstudio.microsoft.com/downloads/) with nodejs development as important workload.
 or you can download [Visual studio code](https://code.visualstudio.com/download)
- [node.js](https://nodejs.org/en/download/)
- Installed and configured npm


### Install extensions in VS Code in case you are using code
1. Go to Extensions (Ctlr+Shift+X)
2. npm (Identifier: eg2.vscode-npm-script)


### How to run FraudDetectionApp
1. Having the project cloned Open VS/VS Code and point to the cloned directory.
2. Install dependencies using 'npm install' command in terminal from the project directory where package.json is present.
3. Build the project either using visual studio or visual studio code/cmd using npm run build.
4. Clean the project using npm run clean.
5. Start the app using visual studio or though command prompt 'npm run start'+Launch the exposed url on chrome


## How to update the transactional dataset for application
This application uses the sample data present in the project root directory '**Transactions.json**' as a alternate to database since this is a basic app for now.
Update it if required.

