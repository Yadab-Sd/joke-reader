import store from 'store';
import { Keys } from './constants';
import { mongoObjectId } from './idGenerator';

export const getData = (key: any, id?: any) => {
  const data = store.get(key);
  const parsedData = data ? data : [];
  if (id) return parsedData.find((item: { id: any }) => item.id === id);
  else return parsedData;
};

export const setData = (
  key: string,
  data: {
    category: string;
    type: string;
    flags: string[];
    content: string;
    delivery: string;
  }
) => {
  const existedData = getData(key);
  let expandableData: any[] = [];
  if (existedData) expandableData = [...existedData];
  const newId = mongoObjectId();
  expandableData.push({ id: newId, ...data });
  store.set(key, expandableData);
  return newId;
};

export const updateData = (
  key: any,
  input: {
    id: string;
    category: string;
    type: string;
    flags: string[];
    content: string;
    delivery: string;
  }
) => {
  let data = store.get(key);

  data.forEach((item: { id: string }, i: string | number) => {
    if (item.id === input.id) {
      data[i].category = input.category;
      data[i].type = input.type;
      data[i].flags = input.flags;
      data[i].content = input.content;
      data[i].delivery = input.delivery;
    }
  });

  store.remove(Keys.jokes);
  store.set(key, data);

  return input.id;
};
