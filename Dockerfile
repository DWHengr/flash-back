FROM node:14-alpine
WORKDIR /flash
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
