module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Reemplaza con la URL de tu frontend si es diferente
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, DELETE, PATCH',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
};
