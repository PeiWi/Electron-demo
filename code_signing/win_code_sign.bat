@echo off
cls
set /P pfxPassword=Enter password of pfx :

"C:\\Program Files (x86)\\Windows Kits\\10\\bin\\x86\\signtool" sign /n KeyXentic /fd sha256 /tr "http://timestamp.digicert.com" /td sha256 /f "code_signing\\win_KX_Code_Signing(GlobalSign).p12" /p %pfxpassword% "%~1"

if %ERRORLEVEL% == 1 (
    exit /b 1
) else (
    exit /b 0
)
