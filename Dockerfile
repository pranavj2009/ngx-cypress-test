FROM cypress/base:14.19.0

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm install && npm start

RUN $(npm bin)/cypress verify

CMD ["npm", "run", "cypress:run"]