import { config } from 'dotenv';
import { runSeeders } from 'typeorm-extension';
import { CreateSeeds } from './create-seeds';
import ChoppiDataSource from '../shared/data-source';

async function runSeeds() {
  try {
    await ChoppiDataSource.initialize();
    console.log('Database connected successfully');

    await runSeeders(ChoppiDataSource, {
      seeds: [CreateSeeds],
    });

    console.log('Seeds executed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
}

runSeeds();
