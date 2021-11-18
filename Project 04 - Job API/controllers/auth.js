
const register = async (req, res) => {
  res.send('Registered User');
}

const login = async (req, res) => {
  res.send('Logged on User');
}

export { register, login };
