const MelhorEnvioSdk = require('melhor-envio')

const MELHOR_ENVIO = new MelhorEnvioSdk({
      client_id: process.env.MELHOR_ENVIO_CLIENT_ID,
      client_secret: process.env.MELHOR_ENVIO_SECRET,
      sandbox: true,
      bearer:
        process.env.MELHOR_ENVIO_TOKEN,
      redirect_uri: process.env.MELHOR_ENVIO_CALLBACK_URI,
      request_scope:
        'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
    })

    export default MELHOR_ENVIO