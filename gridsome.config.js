module.exports = {
  siteName: 'Kamil Kras - Portfolio',
  plugins: [
    {
      use: '@gridsome/source-graphql',
      options: {
        url: process.env['API_ENDPOINT'],
        fieldName: 'graphCMS',
        typeName: 'graphTypes',
        headers: {
          Authorization: `Bearer ${process.env['API_TOKEN']}`,
        }
      }
    }
  ]
}
