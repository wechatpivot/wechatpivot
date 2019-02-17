FROM hbrls/egg-web:v0.2.0

COPY app /var/app/app
COPY config /var/app/config
COPY app.js /var/app/app.js
COPY index.js /var/app/index.js
COPY package.json /var/app/package.json

RUN \
  mv /var/app-run/node_modules /var/app && \
  cd /var/app && \
  npm install --production --no-optional --no-package-lock
