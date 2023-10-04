import axios from 'axios';
import { PrimaryColorCard } from 'constant';

export const getTemPlates = async () => await axios.get('/templates');

export const createTemplates = async (data) =>
  await axios.post('/emails', data);
