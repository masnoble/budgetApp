#!/bin/bash

cd /home/jnthomas522/budgetApp

git pull origin main

cat >/etc/supervisor/conf.d/node-app.conf << EOF
[program:nodeapp]
directory=/etc/supervisor/conf.d/node-app.conf
command=yarn start
autostart=true
autorestart=true
user=jnthomas522
environment=HOME="/home/jnthomas522",USER="jnthomas522",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update

supervisorctl restart nodeapp

ls
