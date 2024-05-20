import { spawn } from 'child_process';
import * as path from 'path';

const scriptPath = path.join(__dirname, '..', 'util', 'searchCert.ps1');

const child = spawn('powershell.exe', [scriptPath]);

child.stdout.on('data', (data) => {
    console.log(`Standard Output: ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`Standard Error Output: ${data}`);
});

child.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});
