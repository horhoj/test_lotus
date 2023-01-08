#Тестовое задание

Это тестовое задание сделанное для Вашей компании.
Все пункты задания выполнены успешно.


#зависимости
node 14, yarn

#Стек

фронт: typescript, react, docker, eslint, socket.io-client
бэк: nodejs, socket.io


#Запуск

В папке с проектом запустить

Бэкенд:
cd src/server/src && yarn && yarn dev

фронтенд: 
yarn && yarn start

#Запуск в докере

Проверено на Ubuntu 22.04 lts, c установленными make, docker, docker-compose

В папке с проектом запустить: 

make init

фронт будет запущен на 80 порту, бэк на порту 7777 (на localhost)

хост бэкенда можно задать в .env (есть .env.example в качестве примера)



