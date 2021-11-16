
const login = (req, res) => {
  res.status(200).send('Fake Login/Register/Signup Route');
}

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({ msg: `Hello John Doe`, secret: `Heree is your authorized data, your lucky number is ${luckyNumber}` });
}

export { login, dashboard };