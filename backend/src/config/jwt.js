/**
 * JWT configuration.
 * Reads the secret from the JWT_SECRET environment variable.
 */
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret_change_in_production',
  expiresIn: '7d',
};

module.exports = jwtConfig;
