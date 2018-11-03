FROM hbrls/egg-web:latest

COPY app /var/app/app
COPY config /var/app/config
COPY app.js /var/app/app.js
COPY index.js /var/app/index.js
COPY package.json /var/app/package.json

# RUN \
#   mv /var/app/package-build.json /var/app-build/package.json && \
#   cd /var/app-build && npm install --production --no-optional --no-package-lock && \
#   mv /var/app-build/node_modules /var/app && \
#   cd /var/app && npm run build && \
#   rm -rf /var/app/node_modules

RUN \
  mv /var/app-run/node_modules /var/app && \
  cd /var/app && \
  npm install --production --no-optional --no-package-lock
