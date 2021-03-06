FROM mhart/alpine-node:14

WORKDIR /

COPY package.json /
RUN npm i
ADD . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
