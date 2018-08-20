Param([String]$path)
[convert]::ToBase64String((get-content $path -encoding byte))