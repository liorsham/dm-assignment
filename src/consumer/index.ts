import amqp from 'amqplib';
import { initializeDatabase, Region, City, Street } from '../db';
import { Model } from 'sequelize-typescript';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function connectWithRetry(retries = 5, delay = 5000): Promise<amqp.Connection> {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to RabbitMQ (attempt ${i + 1}/${retries})...`);
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      console.log('Successfully connected to RabbitMQ');
      return connection;
    } catch (error: any) {
      console.error(`Failed to connect (attempt ${i + 1}/${retries}):`, error.message);
      if (i === retries - 1) throw error;
      await sleep(delay);
    }
  }
  throw new Error('Failed to connect to RabbitMQ');
}

async function consume(): Promise<void> {
  await initializeDatabase();
  
  const connection = await connectWithRetry();
  const channel = await connection.createChannel();
  const queue = 'street_data';

  await channel.assertQueue(queue, { 
    durable: true,
  });

  console.log('Waiting for messages...');

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const streetData = JSON.parse(msg.content.toString());
      
      const [region] = await (Region as any).findOrCreate({
        where: { region_code: streetData.region_code },
        defaults: { region_name: streetData.region_name }
      });

      const [city] = await (City as any).findOrCreate({
        where: { city_code: streetData.city_code },
        defaults: { 
          city_name: streetData.city_name,
          region_code: region.region_code
        }
      });

      await Street.create({
        street_code: streetData.street_code,
        street_name: streetData.street_name,
        street_name_status: streetData.street_name_status,
        official_code: streetData.official_code,
        city_code: city.city_code
      } as any);

      channel.ack(msg);
      console.log('Processed street:', streetData.street_name);
    } catch (error) {
      console.error('Error processing message:', error);
      channel.nack(msg);
    }
  });

  process.on('SIGINT', async () => {
    try {
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error closing connections:', error);
    }
    process.exit(0);
  });
}

consume().catch(console.error);
