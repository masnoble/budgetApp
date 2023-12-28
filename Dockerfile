FROM node:18-alpine

WORKDIR /app
VOLUME /app

RUN apk add --update mysql mysql-client && rm -f /var/cache/apk/*
# RUN apk add tcpdump

# These lines moved to the end allow us to rebuild image quickly after only these files were modified.
COPY ./db/dbstartup.sh /dbstartup.sh
COPY ./db/my.cnf /etc/mysql/my.cnf


# COPY ./webApp/package.json /

# RUN npm install
# COPY ./webApp/ /

# COPY startup.sh /
EXPOSE 3306
CMD ["/dbstartup.sh"]

#tcpdump -n -i eth0  "port 3306"