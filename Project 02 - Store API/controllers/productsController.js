
const getAllProducts = async (req, res, next) => {
  res.status(200).json({ msg: 'Product list' });
}

const getAllProductsStatic = async (req, res, next) => {
  res.status(200).json({ msg: 'Products routes' })
}

export {
  getAllProducts,
  getAllProductsStatic
}