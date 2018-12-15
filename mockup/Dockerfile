FROM hbrls/egg-web:latest

COPY app /var/app/app
COPY config /var/app/config
COPY rsrc /var/app/rsrc
COPY app.js /var/app/app.js
COPY gulpfile.js /var/app/gulpfile.js
COPY .babelrc /var/app/.babelrc
COPY .postcssrc /var/app/.postcssrc
COPY index.js /var/app/index.js
COPY package.json /var/app/package.json

RUN \
  mv /var/app-build/node_modules /var/app && \
  cd /var/app && \
  NODE_ENV=development npm install --no-optional --no-package-lock && \
  cd /var/app && npm run build && \
  rm -rf /var/app/node_modules


RUN \
  mv /var/app-run/node_modules /var/app && \
  cd /var/app && npm install --production --no-optional --no-package-lock
