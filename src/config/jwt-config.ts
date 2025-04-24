import { envConfig } from "@configs";

export const jwtConfig = {
	secret: envConfig.JWT_SECRET,
	signOptions: {
		expiresIn: envConfig.JWT_EXPIRES_IN,
		issuer: envConfig.JWT_ISSUER,
		audience: envConfig.JWT_AUDIENCE,
	},
	verifyOptions: {
		issuer: envConfig.JWT_ISSUER,
		audience: envConfig.JWT_AUDIENCE,
	},
};

export default jwtConfig;
