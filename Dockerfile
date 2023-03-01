FROM node:12.19.0-alpine3.9
WORKDIR /flash
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]

