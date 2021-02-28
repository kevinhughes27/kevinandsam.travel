FROM node:10.24.0-stretch-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    bzip2 \
    yarn \
    git

WORKDIR /app

COPY package.json yarn.lock ./
# I had to enter the container and yarn install again to get sharp
RUN yarn install

EXPOSE 8000

CMD [ "yarn", "start" ]
