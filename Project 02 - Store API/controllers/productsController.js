import { productModel } from '../models/productModel.js';

const getSkipAndLimit = (queryPage, queryLimit) => {
  const page = Number(queryPage) || 1;
  const limit = Number(queryLimit) || 10;
  const skip = (page - 1) * limit;

  return { skip, limit };
}

const getNumericFilters = (numericFilters) => {
  const operatorMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte'
  };
  const regEx = /\b(<|>|>=|<=|=)\b/g;
  const options = ['price', 'rating'];
  
  let filters = numericFilters
    .split(',')
    .map(filterString => filterString.replace(regEx, match => `-${operatorMap[match]}-`).split('-'))
    .map(filter => {
      const [field, operator, value] = filter;
      if (options.includes(field)) return [field, { [operator]: Number(value) }];
      return;
    })
    .filter(Boolean); // Filters unsupported numeric fields.

  return filters;
}

const getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort = 'createdAt', fields = '', numericFilters } = req.query;
  const productObject = {};

  if(featured) productObject.featured = featured === 'true' ? true : false;
  if(company) productObject.company = company;
  if(name) productObject.name = { $regex: name, $options: 'i' };
  if(numericFilters) {
    const filters = getNumericFilters(numericFilters);
    filters.forEach(([field, filter]) => productObject[field] = filter)
  };
  const { skip, limit } = getSkipAndLimit(req.query.page, req.query.limit);

  const queryResult = productModel
    .find(productObject)
    .sort(sort.split(',').join(' '))
    .select(fields.split(',').join(' '))
    .skip(skip)
    .limit(limit);
  
  const products = await queryResult;

  res.status(200).json({ products, nbHits: products.length });
}

export {
  getAllProducts,
  getAllProductsStatic
}