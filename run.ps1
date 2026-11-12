<#
.SYNOPSIS
    Operation script for the portfolio site (static, frontend-only).

.EXAMPLE
    .\run.ps1 run
    .\run.ps1 run-frontend-debug 8080
#>
param(
    [Parameter(Position = 0)]
    [string]$Command = "help",

    [Parameter(Position = 1)]
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Show-Help {
    @"
Usage: .\run.ps1 <command> [port]

  run | run-local        Serve the site at http://127.0.0.1:<port> (default 8000) and open it
  run-frontend           Same as run (the site is frontend-only)
  run-frontend-debug     Serve with caching disabled, so every reload picks up your edits
"@
}

switch ($Command) {
    { $_ -in "run", "run-local", "run-frontend" } {
        Start-Process "http://127.0.0.1:$Port/"
        python -m http.server $Port --bind 127.0.0.1
    }

    "run-frontend-debug" {
        $server = @'
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

port = int(sys.argv[1])
print(f"Serving with caching disabled at http://127.0.0.1:{port}/")
ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler).serve_forever()
'@
        Start-Process "http://127.0.0.1:$Port/"
        python -c $server $Port
    }

    default { Show-Help }
}
