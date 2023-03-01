FROM node:14

WORKDIR /myfolder/

COPY package-json /myfolder/
COPY package-lock-json /myfolder/
RUN yarn install

COPY . /myfolder/
CMD yarn dev