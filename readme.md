## Requirements:

- Node.js
- pnpm
- taskfile

## Server setup
To setup the server, you will need a mariadb instance or any other mysql database, to setup mariadb refer to [mariadb docs](https://mariadb.com/docs/server/mariadb-quickstart-guides/installing-mariadb-server-guide), after that you will need the server file, you can find the latest one at [releases](https://github.com/reitechorg/Concordia/releases), copy the file's path and run:
 
```bash
curl -L -O URL_HERE
chmod +x concordia-server
```

First run of the server should be done directly from terminal, the server will ask you for setup information

```bash
./concordia-server
```

After the initial setup, you can add the server to systemd for auto-update support and restarting alongside the server:
```bash
sudo bash -c 'echo "Description=Concordia Server
After=network.target

[Service]
Type=simple
User=user
WorkingDirectory=ABSOLUTE_PATH_TO_CONCORDIA_SERVER_EXECUTABLE_DIRECTORY
ExecStart=ABSOLUTE_PATH_TO_CONCORDIA_SERVER_EXECUTABLE
Restart=always
RestartSec=5
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
" > /etc/systemd/system/concordia.service'
sudo systemctl daemon-reload
sudo systemctl start concordia
```

To check server logs use:
```bash
sudo journalctl -u concordia -f
```

## Development

To start the development server for the client, run:

```bash
task dev
```

To start the development server for the server, run:

```bash
task server:dev
```
