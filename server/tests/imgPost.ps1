[string]$Img = Get-Content -Path "./img.txt" | Out-String


$RequestParams = @{
  Img = $img
}


Invoke-WebRequest -Uri http://localhost:8000/img -Method POST -Body $RequestParams