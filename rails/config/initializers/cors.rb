Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
             method: [:get, :post, :put, :patch, :delete, :options],
             headers: :any,
             max_age: 3600
  end
end
