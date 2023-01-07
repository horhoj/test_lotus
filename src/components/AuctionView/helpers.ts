export const getTimeInHumanUnderstandableForm = (time: number) => {
  const MS_IN_HOURS = 60 * 60 * 1000;
  const MS_IN_MIN = 60 * 1000;
  const MS_IN_SEC = 1000;

  let acc = time;
  const hours = (acc - (acc % MS_IN_HOURS)) / MS_IN_HOURS;
  acc = acc % MS_IN_HOURS;
  const min = (acc - (acc % MS_IN_MIN)) / MS_IN_MIN;
  acc = acc % MS_IN_MIN;
  const sec = (acc - (acc % MS_IN_SEC)) / MS_IN_SEC;

  const format = (val: number) => (val < 10 ? `0${val}` : `${val}`);

  return `${format(hours)}:${format(min)}:${format(sec)}`;
};
