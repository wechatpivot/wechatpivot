FROM hbrls/eggjs:latest

RUN \
  cd /var && wget https://github.com/wechat-developer/wechat-pivot/archive/docker-pivot.tar.gz && \
  tar -zxvf /var/docker-pivot.tar.gz -C /var && rm /var/docker-pivot.tar.gz && \
  rm -r /var/app && mv /var/wechat-pivot-docker-pivot/pivot /var/app


RUN \
  mv /var/app-build/node_modules /var/app && \
  # cd /var/app && \
  # npm run build && \
  rm -rf /var/app/node_modules


RUN \
  mv /var/app-run/node_modules /var/app && \
  cd /var/app && \
  npm install --production --no-optional
