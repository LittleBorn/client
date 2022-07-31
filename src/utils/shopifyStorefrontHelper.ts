import axios from "axios"

export const sendStorefrontQuery = <T>(data: string) => {
  
  var config = {
    method: 'post',
    url: 'https://littleborn.myshopify.com/api/2022-07/graphql.json',
    headers: { 
      'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_TOKEN || "28869d2b1c2ac7dbd3998dfed945cd2a", 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return new Promise<T>((resolve, reject) => {

    axios(config)
    .then(function (response: any) {
        resolve(response.data)
      })
      .catch(function (error: any) {
        reject(error)
      });

  })

}