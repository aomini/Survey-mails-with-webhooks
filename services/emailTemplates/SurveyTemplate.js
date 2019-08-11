const { surveyCallbackDomain } = require("../../config/keys");
module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align:center">
          <h3>Please participate in this survey</h3>
          <p>${survey.body}</p>
          <div>
            <a 
            href="${surveyCallbackDomain}/api/surveys/${survey.id}/yes">Yes</a>
            <a href="${surveyCallbackDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>    
    </html>
   `;
};
