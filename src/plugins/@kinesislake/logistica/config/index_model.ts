const MelhorEnvioSdk = require('melhor-envio')

const MELHOR_ENVIO = new MelhorEnvioSdk({
  client_id: "SEU CLIENT ID",
  client_secret: "SEU CLIENT SECRET",
  sandbox: true, // OPCIONAL, PARA DEVELOPMENT MODE
  bearer: "SEU TOKEN GERADO NO PAINEL DO MELHOR ENVIO",
  redirect_uri: "URL PARA RETORNAR STATUS CODE 200 PARA O SERVIDOR",
  request_scope:
    'cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write webhooks-read webhooks-write',
})

export default MELHOR_ENVIO