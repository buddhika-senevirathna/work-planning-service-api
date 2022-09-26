const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: "Work planning service API",
			version: "1.0.0",
			description: "Simple employee shift planning and management API",
		},
		servers: [
			{
				url: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`,
			},
		],
		components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        }
	},
	apis: ["./router/*.js"],
}

module.exports = options;