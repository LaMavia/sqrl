$folder = $PSScriptRoot
$filter = '*.*'                             # <-- set this according to your requirements
$destination = "C:/Users/xelox/Creative\ Cloud\ Files"
$fsw = New-Object IO.FileSystemWatcher $folder, $filter -Property @{
 IncludeSubdirectories = $true              # <-- set this according to your requirements
 NotifyFilter = [IO.NotifyFilters]'FileName, LastWrite'
}

$onCreated = Register-ObjectEvent $fsw Created -SourceIdentifier FileCreated -Action {
 $path = $Event.SourceEventArgs.FullPath
 $name = $Event.SourceEventArgs.Name
 $changeType = $Event.SourceEventArgs.ChangeType
 $timeStamp = $Event.TimeGenerated
 Write-Host "The file '$name' was $changeType at $timeStamp"

 # Move-Item $path -Destination $destination -Force -Verbose # Force will overwrite files with same name
}
