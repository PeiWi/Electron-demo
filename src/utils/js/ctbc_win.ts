import path from "path";
// import sudo from 'sudo-prompt';
// import { exec } from 'child_process';
// import fs from "fs";

let modulePath;

console.log(__dirname)

if (process.env.NODE_ENV === 'development') {
    modulePath = path.resolve(__dirname, '..', '..', '..', '..', 'node_sdk', 'CTBCWebATM_node.node');
    // modulePath = path.join(process.resourcesPath, '..', '..', '..','..', 'node_sdk', 'CTBCWebATM_node.node');
} else {
    modulePath = path.resolve(process.resourcesPath, 'node_sdk', 'CTBCWebATM_node.node');
}



console.log(modulePath);


// function checkAndInstallCertificate() {
//     const certificateName = "CTBCBANK Root CA";
//     exec(`security find-certificate -c "${certificateName}"`, (error, stdout, stderr) => {
//         if (error || stderr) {
//             console.log("Certificate not found in Keychain, installing...");
//             const certificatePath = "/Applications/CTBC WebATM.app/Contents/Resources/src/utils/certificate/mac/CTBCBANK Root CA.cer";
//             sudo.exec(
//                 `security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" "${certificatePath}"`,
//                 { name: 'CTBC WebATM Installer' },
//                 function(installError) {
//                     if (installError) {
//                         console.error("Error installing certificate:", installError);
//                     } else {
//                         console.log("Certificate installed successfully.");
//                     }
//                 }
//             );
//         } else {
//             console.log("Certificate already exists in Keychain.");
//         }
//     });
// }

// checkAndInstallCertificate();

console.log(modulePath)
console.log(process.resourcesPath)
const addon = require(modulePath);

function fastConnect() {
    addon.ListReaders();
    addon.ConnectCard(addon.GetReaderName(0));
}

const pin = '92570002';

function sampleTest() { 
    fastConnect();
    const msg = '<MSG>	<Tag1>中國信託商業銀行 WEB ATM</Tag1>	<Tag2>餘額查詢 : 確認交易資料</Tag2>	<Tag3></Tag3>	<Tag4>查詢帳號</Tag4>	<Tag5> (TestAccount)0000107201169047</Tag5><MSG>';
    const reader = addon.GetReaderName(0);
    const account = addon.GetEF1001Account(0);
    const sn = addon.ReadCardSN();

	console.log(reader)
	console.log(account)
	console.log(sn)

    return 'account inquiry: ' + addon.AccountInquiry('2500', '12345678', account, pin, sn, 1, 1, 1, msg, 0) + '\nreader: ' + reader + '\naccount: ' + account + '\nsn: ' + sn;
}

function GetSessionKeyHash() { 
    fastConnect();
    const reader = addon.GetReaderName(0);
    const account = addon.GetEF1001Account(0);
    const sn = addon.ReadCardSN();
    // const ConnectCard = addon.ConnectCard(reader);
    // const keyHash = addon.GetSessionKeyHash();
    const VerifyPIN = addon.VerifyPIN(pin);

	console.log(reader)
	console.log(account)
	console.log(sn)
    console.log(VerifyPIN)

    return VerifyPIN;
}


export {
    sampleTest,
    GetSessionKeyHash
}