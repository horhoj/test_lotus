// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const io = require('socket.io')({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`connect: ${socket.id}`);

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(7777);

//данные участников
const participantList = [
  {
    id: 111,
    name: 'ООО Зандерка',
    isQualityStandard: false,
    productionTime: 80,
    warrantyPeriod: 24,
    termsOfPayment: 30,
    totalCostCeil: 3700000,
    totalCostMedium: -25000,
    totalCostFloor: 2475000,
  },
  {
    id: 222,
    name: 'ИП Ксарион Жульберт Адрисович',
    isQualityStandard: false,
    productionTime: 90,
    warrantyPeriod: 24,
    termsOfPayment: 100,
    totalCostCeil: 3200000,
    totalCostMedium: -25000,
    totalCostFloor: 2475000,
  },
  {
    id: 333,
    name: 'ОАО Сорна компани',
    isQualityStandard: true,
    productionTime: 75,
    warrantyPeriod: 22,
    termsOfPayment: 60,
    totalCostCeil: 2800000,
    totalCostMedium: -25000,
    totalCostFloor: 2475000,
  },
  {
    id: 444,
    name: 'ИП Филистимлянин Голиаф Давидович',
    isQualityStandard: false,
    productionTime: 120,
    warrantyPeriod: 36,
    termsOfPayment: 50,
    totalCostCeil: 2500000,
    totalCostMedium: -25000,
    totalCostFloor: 2475000,
  },
];
//дата начала аукциона (для простоты это фиксированная дата)
const startTime = new Date('2023-01-07 18:32:00').getTime();
//кол-во миллисекунд на ход участника ('эквивалентно 2 минутам)
const participantsTurnTime = 2 * 60 * 1000;

setInterval(() => {
  //кол-во участников
  const participantCount = participantList.length;
  //прошло времени с начала аукциона в миллисекундах
  const timeHasElapsedSinceStartOfAuction = new Date().getTime() - startTime;
  //кол-во ходов участников с начала аукциона
  const currentStep = Math.floor(
    timeHasElapsedSinceStartOfAuction / participantsTurnTime,
  );
  //получаем ИД текущего участника аукциона
  const currentParticipantIdx = currentStep % participantCount;
  const currentParticipantId = participantList[currentParticipantIdx].id;

  const timeUntilEndOfTurn =
    participantsTurnTime -
    (timeHasElapsedSinceStartOfAuction - currentStep * participantsTurnTime);

  io.emit('message', {
    name: 'Тестовые торги на аппарат ЛОТОС №2033564',
    startTime,
    participantsTurnTime,
    timeUntilEndOfTurn,
    timeHasElapsedSinceStartOfAuction,
    currentStep,
    currentParticipantId,
    currentTime: new Date().getTime(),
    participantList,
  });
}, 1000);
