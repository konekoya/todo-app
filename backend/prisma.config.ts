import { config } from 'dotenv';

config();

export default {
  datasource: {
    url: process.env.DATABASE_URL!,
  },
};
