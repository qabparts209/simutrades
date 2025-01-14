import sys
import subprocess
import shutil
import webbrowser
import os
from typing import Dict, Optional

REQUIRED_TOOLS = [
    {
        'name': 'WSL2',
        'command': 'wsl',
        'args': ['--version'],
        'url': 'https://docs.microsoft.com/en-us/windows/wsl/install',
    },
    {
        'name': 'Git',
        'command': 'git',
        'args': ['--version'],
        'url': 'https://git-scm.com/download/win',
    },
    {
        'name': 'Node.js',
        'command': 'node',
        'args': ['--version'],
        'url': 'https://nodejs.org/',
    },
    {
        'name': 'npm',
        'command': 'npm',
        'args': ['--version'],
        'url': 'https://nodejs.org/',
    },
    {
        'name': 'Python',
        'command': 'python',
        'args': ['--version'],
        'min_version': '3.8.0',
        'url': 'https://www.python.org/downloads/',
    },
    {
        'name': 'Docker',
        'command': 'docker',
        'args': ['--version'],
        'url': 'https://www.docker.com/products/docker-desktop',
    },
    {
        'name': 'VS Code',
        'command': 'code',
        'args': ['--version'],
        'url': 'https://code.visualstudio.com/',
    },
    {
        'name': 'Railway CLI',
        'command': 'railway',
        'args': ['--version'],
        'url': 'https://docs.railway.app/develop/cli',
    }
]

REQUIRED_VS_CODE_EXTENSIONS = [
    {
        'name': 'Python',
        'id': 'ms-python.python',
        'url': 'https://marketplace.visualstudio.com/items?itemName=ms-python.python'
    },
    {
        'name': 'WebGL Shader Editor',
        'id': 'raczzalan.webgl-shader-editor',
        'url': 'https://marketplace.visualstudio.com/items?itemName=raczzalan.webgl-shader-editor'
    },
    {
        'name': 'Chrome Debugger',
        'id': 'msjsdiag.debugger-for-chrome',
        'url': 'https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome'
    },
    {
        'name': 'Canvas Debugger',
        'id': 'kodespace.canvas-debugger',
        'url': 'https://marketplace.visualstudio.com/items?itemName=kodespace.canvas-debugger'
    },
    {
        'name': 'WebGL Inspector',
        'id': 'vscode-webgl-inspector',
        'url': 'https://marketplace.visualstudio.com/items?itemName=vscode-webgl-inspector'
    },
    {
        'name': 'Canvas Performance Monitor',
        'id': 'vscode-canvas-performance',
        'url': 'https://marketplace.visualstudio.com/items?itemName=vscode-canvas-performance'
    }
]

REQUIRED_APPLICATIONS = [
    {
        'name': 'Postman',
        'url': 'https://www.postman.com/downloads/',
        'windows_path': r'C:\Users\%USERNAME%\AppData\Local\Postman\Postman.exe'
    },
    {
        'name': 'Redis Desktop Manager',
        'url': 'https://rdm.dev/',
        'windows_path': r'C:\Program Files\RedisDesktopManager\rdm.exe'
    },
    {
        'name': 'pgAdmin',
        'url': 'https://www.pgadmin.org/download/',
        'windows_path': r'C:\Program Files\pgAdmin 4\bin\pgAdmin4.exe'
    },
    {
        'name': 'Chrome DevTools WebGL Tab',
        'url': 'chrome://flags/#enable-webgl-developer-extensions',
        'windows_path': r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    },
    {
        'name': 'Canvas Performance Analyzer',
        'url': 'https://github.com/spector-engine/spectorjs',
        'windows_path': None,  # This is a browser extension
        'browser_extension': True
    }
]

def check_tool_version(command: str, args: list[str]) -> Dict[str, Optional[str]]:
    """Check if a development tool is installed and get its version."""
    try:
        result = subprocess.run(
            [command] + args,
            capture_output=True,
            text=True,
            check=True
        )
        return {
            'installed': True,
            'version': result.stdout.strip()
        }
    except (subprocess.CalledProcessError, FileNotFoundError):
        return {
            'installed': False,
            'version': None
        }

def check_vscode_extension(extension_id: str) -> bool:
    """Check if a VS Code extension is installed."""
    try:
        result = subprocess.run(
            ['code', '--list-extensions'],
            capture_output=True,
            text=True,
            check=True
        )
        return extension_id in result.stdout
    except subprocess.CalledProcessError:
        return False

def check_application_installed(windows_path: str) -> bool:
    """Check if an application is installed by looking for its executable."""
    expanded_path = os.path.expandvars(windows_path)
    return os.path.exists(expanded_path)

def print_status(name: str, installed: bool, version: Optional[str] = None):
    """Print the status of a tool or application."""
    status = '✓' if installed else '✗'
    version_str = f" ({version})" if version else ""
    print(f"{status} {name}{version_str}")

def verify_environment():
    """Verify all required development tools are installed."""
    print("\nChecking Development Tools...")
    print("============================")
    
    all_installed = True
    missing_tools = []

    # Check command line tools
    for tool in REQUIRED_TOOLS:
        result = check_tool_version(tool['command'], tool['args'])
        print_status(tool['name'], result['installed'], result['version'])
        if not result['installed']:
            all_installed = False
            missing_tools.append({
                'name': tool['name'],
                'url': tool['url']
            })

    print("\nChecking VS Code Extensions...")
    print("=============================")
    
    # Check VS Code extensions
    for ext in REQUIRED_VS_CODE_EXTENSIONS:
        installed = check_vscode_extension(ext['id'])
        print_status(ext['name'], installed)
        if not installed:
            all_installed = False
            missing_tools.append({
                'name': f"VS Code Extension: {ext['name']}",
                'url': ext['url']
            })

    print("\nChecking Required Applications...")
    print("================================")
    
    # Check applications
    for app in REQUIRED_APPLICATIONS:
        installed = check_application_installed(app['windows_path'])
        print_status(app['name'], installed)
        if not installed:
            all_installed = False
            missing_tools.append({
                'name': app['name'],
                'url': app['url']
            })

    if not all_installed:
        print("\n❌ Missing Required Tools:")
        print("========================")
        for tool in missing_tools:
            print(f"\n{tool['name']}")
            print(f"Download: {tool['url']}")
            
        response = input("\nWould you like to open download pages for missing tools? (y/n): ")
        if response.lower() == 'y':
            for tool in missing_tools:
                webbrowser.open(tool['url'])
                
        sys.exit(1)
    else:
        print("\n✓ All required development tools are installed!")

def check_browser_extension(extension_id: str) -> bool:
    """Check if a Chrome extension is installed."""
    # This is a placeholder as we can't directly check browser extensions
    # We'll need to prompt the user to verify manually
    print(f"\nPlease verify manually that the {extension_id} extension is installed in Chrome.")
    response = input("Is it installed? (y/n): ")
    return response.lower() == 'y'

if __name__ == "__main__":
    verify_environment() 