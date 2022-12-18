const path = require("path");
const fs = require("fs");
const { basePath } = require("../basePath.js");

const testCasesDir = path.join(basePath(), "TestCases");

if (!fs.existsSync(testCasesDir)) {
    fs.mkdirSync(testCasesDir, { recursive: true });
}

const generateTestCaseFiles = async (public_test_case_obj, private_test_case_obj, ques_id) => {
    // Create a new directory for the question
    // quesDir: directory path of the question

    const quesDir = path.join(dirTestCases, `${ques_id}`);
    if (!fs.existsSync(quesDir)) {
        fs.mkdirSync(quesDir, { recursive: true });
    }

    const public = path.join(quesDir, "public");
    if (!fs.existsSync(public)) {
        fs.mkdirSync(public, { recursive: true });
    }

    for (var i = 0; i < public_test_case_obj.length; i++) {
        var test_case = public_test_case_obj[i];

        const input_file = path.join(public, `${i}_in.txt`);
        await fs.writeFileSync(input_file, test_case.input);

        const output_file = path.join(public, `${i}_out.txt`);
        await fs.writeFileSync(output_file, test_case.output);
    }

    const private = path.join(quesDir, "private");
    if (!fs.existsSync(private)) {
        fs.mkdirSync(private, { recursive: true });
    }

    for (var i = 0; i < private_test_case_obj.length; i++) {
        var test_case = private_test_case_obj[i];

        const input_file = path.join(private, `${i}_in.txt`);
        await fs.writeFileSync(input_file, test_case["input"]);

        const output_file = path.join(private, `${i}_out.txt`);
        await fs.writeFileSync(output_file, test_case["output"]);
    }
};

module.exports = { generateTestCaseFiles };
