import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Store } from '../stores/store.entity';

export class StoresSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const storeRepository = dataSource.getRepository(Store);

    const stores = [
      {
        name: 'Supermercado Central',
        description: 'El supermercado más grande de la ciudad con productos frescos y precios competitivos',
        city: 'Caracas',
        address: 'Av. Bolívar Norte, Centro',
        isActive: true,
      },
      {
        name: 'Tienda de la Esquina',
        description: 'Tienda familiar con productos locales y atención personalizada',
        city: 'Valencia',
        address: 'Calle Real de Sabana Grande, Valencia',
        isActive: true,
      },
      {
        name: 'Mercado Orgánico',
        description: 'Especialistas en productos orgánicos y naturales, con opciones vegetarianas',
        city: 'Maracaibo',
        address: 'Av. 5 de Julio, Bella Vista',
        isActive: true,
      },
    ];

    await storeRepository.save(stores);

  }
}