import amqp from 'amqplib';
import { StreetsService } from '../israeliStreets/StreetsService';
import { City } from '../israeliStreets/cities';


async function publish(city: string): Promise<void> {
  try {
    console.log("trying to connect to localhost")
    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    const queue = 'street_data';

    await channel.assertQueue(queue, { durable: true });

    const streetData = await StreetsService.getStreetsInCity(city as City);
    console.log(`Publishing ${streetData.streets.length} streets for city: ${city}`);
    
    for (const street of streetData.streets) {
      // console.log("publishing the following street", street);
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(street)));
    }

    // Close connection after publishing
    await channel.close();
    await connection.close();
    
    console.log('Successfully published all streets');
    process.exit(0);
  } catch (error: any) {
    console.error('publish Error:', error, error?.stack);
    process.exit(1);
  }
}

// Get city name from command line arguments
const city = process.argv[2];
if (!city) {
  console.error('Please provide a city name as an argument');
  console.log('Usage: npm run publish <city_name>');
  process.exit(1);
}

publish(city).catch(error => {
  console.error('Failed to publish:', error);
  process.exit(1);
});