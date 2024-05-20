
var execSync = require('child_process').execSync

exports.default = async function(configuration) {
  // your custom code
  console.log(configuration)
  // execSync(`call "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\x86\\signtool" sign /n KeyXentic /fd sha256 /tr "http://timestamp.digicert.com" /td sha256 "${configuration.path}"`)
  try {
    if(!configuration.path.includes('\\node_modules\\vuex-electron\\')) {
      console.log(configuration.path)
      execSync(`cmd /v /e /c "start /high /wait cmd /c code_signing\\win_code_sign.bat "${configuration.path}" & exit ^!ERRORLEVEL^!"`);
    }
  } catch (error) {
    if(error.status == 1) {
      console.error("Using signtool error with code : %s", error)
      console.log(error.stdout.toString())
      console.log(error.stderr.toString())
      process.exit(1)
    }
  }
}