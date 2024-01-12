import { Request, Response } from 'express';
import ListProdutcService from '../services/ListProductService';
import ShowProdutcService from '../services/ShowProductService';
import CreateProdutcService from '../services/CreateProductService';
import UpdateProdutcService from '../services/UpdateProductService';
import DeleteProdutcService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProdutcService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProdutcService();

    const produtc = await showProduct.execute({ id });

    return response.json(produtc);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProdutcService();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateProduct = new UpdateProdutcService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProdutcService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
