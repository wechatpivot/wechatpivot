FROM hbrls/eggjs:latest

RUN \
  cd /var && wget https://github.com/wechat-developer/wechat-pivot/archive/docker-pivot.tar.gz && \
  tar -zxvf /var/docker-pivot.tar.gz -C /var && rm /var/docker-pivot.tar.gz && \
  rm -r /var/app && mv /var/wechat-pivot-docker-pivot/pivot /var/app


# npm install
RUN buildDeps='git make g++' && \
  apt-get update && apt-get install -y $buildDeps && \
  cd /var/app && npm install --no-optional && npm cache clean --force && \
  npm run build && rm -r /var/app/node_modules


# eggjs node_modules
RUN mv /var/app0/node_modules /var/app && \
  cd /var/app && npm install --no-optional --production && npm cache clean --force


RUN apt-get purge -y --auto-remove $buildDeps && rm -rf /var/lib/apt/lists/*
