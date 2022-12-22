const Code = require("../models/code.js");

async function saveCodes(ques_id, user_id, code, language) {
  var status_code;
  var details;

  try {
    let code_obj = await Code.findOne({ ques_id: ques_id }).exec();

    if (code_obj) {
      code_obj.codes.push(code);
      code_obj.save();
    } else {
      code_obj = await new Code({
        ques_no: ques_no,
        user_id: user_id,
        language: language,
      }).save();
      code_obj.codes.push(code);
      code_obj.save();
    }
    this.status_code = 200;
    this.details = code_obj;

    
  } catch(error) {
    this.status_code = 500;
    this.details = error;
    
  } finally {
    return {
      status_code: this.status_code,
      details: this.details,
    };
  }
}

module.exports = { saveCodes };
