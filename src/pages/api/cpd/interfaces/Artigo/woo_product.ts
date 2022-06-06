export interface ProdutoCompleto extends WooProduto {
  loja?: {
    DAN: string
    nome: string
    contato: string
    endereco: {
      endereco: string, numero: string, bairro: string, cidade: string, uf: string
      cep: string
  }
  }
}

export interface WooProduto {
  id?: number,
  name?: string,
  slug?: string,
  permalink?: string,
  date_created?: string,
  date_created_gmt?: string,
  date_modified?: string,
  date_modified_gmt?: string,
  type?: string,
  status?: string,
  featured?: boolean,
  catalog_visibility?: string,
  description?: string,
  short_description?: string,
  sku?: string,
  price?: string,
  regular_price?: string,
  date_on_sale_from?: string,
  date_on_sale_from_gmt?: string,
  date_on_sale_to?: string,
  date_on_sale_to_gmt?: string,
  on_sale?: boolean,
  purchasable?: boolean,
  total_sales?: number,
  virtual?: boolean,
  downloadable?: boolean,
  download_limit?: number,
  download_expiry?: number,
  external_url?: string,
  button_text?: string,
  tax_status?: string,
  tax_class?: string,
  manage_stock?: boolean,
  stock_quantity?: string,
  backorders?: string,
  backorders_allowed?: boolean,
  backordered?: boolean,
  low_stock_amount?: string,
  sold_individually?: boolean,
  weight?: string,
  dimensions?: Dimensions,
  shipping_required?: boolean,
  shipping_taxable?: boolean,
  shipping_class?: string,
  shipping_class_id?: number,
  reviews_allowed?: boolean,
  average_rating?: string,
  rating_count?: number,
  upsell_ids?: Array<string>,
  cross_sell_ids?: Array<string>,
  parent_id?: number,
  purchase_note?: string,
  categories?: Array<CategoriaProduto>,
  tags?: Array<TagsProduto>,
  images?: Array<CategoriaImage>,
  attributes?: Array<AttrProduto>,
  default_attributes?: Array<AttrProduto>,
  variations?: Array<number>,
  grouped_products?: Array<string>,
  menu_order?: number,
  price_html?: string,
  related_ids?: Array<number>,
  meta_data?: Array<MetaProduto>,
  stock_status?: string,
  downloads?: Array<DownloadProduto>
}

export interface DownloadProduto {
  id?: number,
  name?: string,
  file?: string
}

export interface MetaProduto {
  id?: number,
  key?: string,
  value?: string
}

export interface TagsProduto {
  id?: number,
  name?: string,
  slug?: string,
  description?: string,
  count?: number
}

export interface AttrProduto {
  id?: number,
  name?: string,
  slug?: string,
  type?: string,
  order_by?: string,
  options?: Array<string>,
  option?: string,
  has_archives?: boolean
  variation?: boolean
}

export interface CategoriaProduto {
  id?: number,
  name?: string,
  slug?: string,
  parent?: number,
  description?: string,
  display?: string,
  image?: CategoriaImage,
  menu_order?: number,
  count?: number
}

interface CategoriaImage {
  id?: number,
  date_created?: string,
  date_created_gmt?:	string,
  date_modified?:	string,
  date_modified_gmt?:	string,
  src?:	string,
  name?:	string,
  alt?:	string
}

export interface Dimensions {
  length?: string,
  width?: string,
  height?: string
}

export interface WooCustomer {
  id?: number	
  date_created?: string	
  date_created_gmt?: string	
  date_modified?: string
  date_modified_gmt?: string
  email?: string
  first_name?: string
  last_name?: string
  role?: string
  username?: string
  password?: string
  billing?: BillingData
  shipping?: ShippingData
  is_paying_customer?: boolean
  avatar_url?: string
  meta_data?: Array<MetaProduto>
}

interface BillingData {
    first_name?: string
    last_name?: string
    company?: string
    address_1?: string
    address_2?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
    email?: string
    phone?: string
}

interface ShippingData {
  first_name?: string
  last_name?: string
  company?: string
  address_1?: string
  address_2?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
}

export interface WooOrder {
  id?: number
  parent_id?: number
  number?: string
  order_key?: string
  created_via?: string
  version?: string
  status?: string
  currency?: string
  date_created?: string
  date_created_gmt?: string
  date_modified?: string
  date_modified_gmt?: string
  discount_total?: string
  discount_tax?: string
  shipping_total?: string
  shipping_tax?: string
  cart_tax?: string	
  total?: string
  total_tax?: string
  prices_include_tax?: boolean
  customer_id?: number
  customer_ip_address?: string
  customer_user_agent?: string
  customer_note?: string
  billing?: BillingData
  shipping?: ShippingData
  payment_method?: string
  payment_method_title?: string
  transaction_id?: string
  date_paid?: string
  date_paid_gmt?: string
  date_completed?: string
  date_completed_gmt?: string
  cart_hash?: string
  meta_data: Array<MetaProduto>
  line_items?: Array<OrderLine>
  tax_lines?: Array<Taxes>
  shipping_lines?: Array<ShippingLines>
  fee_lines?: Array<FeeLines>
  coupon_lines?: Array<Coupon>
  refunds?: Array<Refunds>
  set_paid?: boolean
}

interface OrderLine {
  id?: number
  name?: string
  product_id?: number
  variation_id?: number
  quantity?: number
  tax_class?: string 
  subtotal?: string
  subtotal_tax?: string
  total?: string
  total_tax?: string
  taxes_array?: Array<Taxes>
  meta_data?:	Array<MetaProduto>
  sku?: string
  price?: string
}

interface Taxes {
  id?: number
  rate_code?: string
  rate_id?: string
  label?: string
  compound?: boolean
  tax_total?: string
  shipping_tax_total?: string
  meta_data?: Array<MetaProduto>
}

interface ShippingLines {
  id?: number
  method_title?: string
  method_id?: string
  total?: string
  total_tax?: string
  taxes?: Array<Taxes>
  meta_data?: Array<MetaProduto>
}

interface FeeLines {
  id?: number
  name?: string
  tax_class?: string
  tax_status?: string
  total?: string
  total_tax?: string
  taxes?: Array<Taxes>
  meta_data?: Array<MetaProduto>
}

interface Coupon {
  id?: number
  code?: string
  discount?: string
  discount_tax?: string
  meta_data?: Array<MetaProduto>
}

interface Refunds {
  id?: number
  reason?: string
  total?: string
}