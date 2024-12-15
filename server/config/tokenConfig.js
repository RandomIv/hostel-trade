const TOKEN_OPTIONS = {
  access: { expiresIn: '15m', secret: process.env.ACCESS_TOKEN_SECRET },
  refresh: { expiresIn: '15d', secret: process.env.REFRESH_TOKEN_SECRET },
  activation: { expiresIn: '1d', secret: process.env.ACCESS_TOKEN_SECRET },
  reset: { expiresIn: '1d', secret: process.env.ACCESS_TOKEN_SECRET },
};

export default TOKEN_OPTIONS;
