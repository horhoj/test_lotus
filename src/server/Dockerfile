FROM node:16

COPY src/ /application
RUN cd /application && yarn

EXPOSE 3000
CMD [ "npm", "run", "start" ]
