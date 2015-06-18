import childProcess from "child_process";

export default function codeClimate(repositoryToken, stdout, callback) {
  if(!callback) {
    callback = stdout;
    stdout = process.stdout;
  }

  const result = childProcess.spawnSync("sh",
    [
      "-c",
      `CODECLIMATE_REPO_TOKEN=${repositoryToken} node ${__dirname}/../node_modules/codeclimate-test-reporter/bin/codeclimate.js < ${__dirname}/../lcov.info`
    ],
    {
      encoding: "utf8"
    });
  if(result.stderr && result.stderr !== "") {
    stdout.write(`\nError on codeclimate: ${result.stderr} \n`);
    callback(new Error(result.stderr));
  } else {
    stdout.write("\nSent to code climate OK!\n");
    callback();
  }
}
