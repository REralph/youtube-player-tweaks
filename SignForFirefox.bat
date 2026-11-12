@echo off
REM ============================================================
REM  Sign YouTube Player Tweaks for Firefox (makes it PERMANENT).
REM  Uses the same Mozilla API key as your Site Blocker:
REM    https://addons.mozilla.org/developers/addon/api/key/
REM  - API key / "JWT issuer" (looks like  user:12345678:6 )
REM  - API secret (a long string)
REM  Your secret is typed privately and is NOT shown or saved.
REM
REM  After changing any file: raise "version" in manifest.json
REM  (e.g. 1.0.0 -> 1.0.1) and run this again.
REM ============================================================
cd /d "C:\Users\User\Desktop\YouTubePlayerTweaks"
echo.
echo Paste your API key - the WHOLE issuer, including any "user:" part
set /p ISSUER=API key (issuer):
echo.
echo Now paste your API secret (it stays hidden as you paste) and press Enter:
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$s = Read-Host 'API secret' -AsSecureString;" ^
  "$b = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($s);" ^
  "$env:WEB_EXT_API_SECRET = [Runtime.InteropServices.Marshal]::PtrToStringAuto($b);" ^
  "$env:WEB_EXT_API_KEY = '%ISSUER%';" ^
  "Write-Host 'Signing... this can take a minute.' -ForegroundColor Cyan;" ^
  "& 'C:\Users\User\Desktop\FirefoxSiteBlocker\node_modules\.bin\web-ext.cmd' sign --source-dir . --channel unlisted --artifacts-dir web-ext-artifacts --ignore-files SignForFirefox.bat 'web-ext-artifacts/**'"
echo.
echo ============================================================
echo  If it said SUCCESS, your signed add-on (.xpi) is in:
echo    C:\Users\User\Desktop\YouTubePlayerTweaks\web-ext-artifacts
echo  Install it in Firefox: about:addons - gear icon -
echo    "Install Add-on From File..." - pick the .xpi
echo ============================================================
echo.
pause
