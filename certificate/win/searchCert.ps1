$cert = Get-ChildItem -Recurse Cert:\CurrentUser\Root | Where-Object { $_.Subject -like "*CTBCBANK Root CA*" }
if ($cert -ne $null) {
    $cert | Format-List
} else {
    Write-Host "Certificate not found"
}
