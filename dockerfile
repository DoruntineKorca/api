FROM        node:18-slim
ARG         NPM_ACCESS_TOKEN

# Install dependencies
RUN apt-get update && \
    npm i -g npm && \
    apt-get install -y gnupg software-properties-common curl lsb-release wget unzip git python3-pip && \
    rm -rf /var/lib/apt/lists/*

# The base node image sets a very verbose log level.
ENV         NPM_CONFIG_LOGLEVEL info

RUN         npm i -g @nestjs/cli@8.1.4

COPY        .npmrc /root/

RUN         mkdir -p /hitkor

COPY        . /hitkor

ARG         ENVIRONMENT
ENV         ENVIRONMENT=${ENVIRONMENT}

ENV         NPM_ACCESS_TOKEN=${NPM_ACCESS_TOKEN}

RUN         cd /hitkor && npm ci && npm run w:build
WORKDIR     /hitkor/packages/api

EXPOSE     3001

ENTRYPOINT ["npm", "start"]