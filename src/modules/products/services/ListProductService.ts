import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProdutcService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas1-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api-vendas1-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProdutcService;
