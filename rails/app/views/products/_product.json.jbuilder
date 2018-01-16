json.extract! product, :id, :name
json.images product.images do |img|
  json.url img.content.url
  json.thumb img.content.thumb.url
end
json.url product_url(product, format: :json)
