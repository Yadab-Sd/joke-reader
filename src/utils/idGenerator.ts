import { Keys } from './constants';
import { getData } from './store';

export const mongoObjectId = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export const randomIdSelection = (id?: string) => {
  const jokeData = getData(Keys.jokes);

  if (jokeData?.length) {
    const randomIndex = Math.floor(Math.random() * jokeData?.length + 0);

    const index = jokeData
      .map((jokeItem: { id: string | undefined }, i: any) =>
        jokeItem.id === id ? i : -1
      )
      .find((trueData: number) => trueData != -1);
    return id ? jokeData[index + 1]?.id : jokeData[randomIndex]?.id;
  }
  return 0;
};
