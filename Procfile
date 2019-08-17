web: yarn --cwd client start
api: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
worker: bundle exec sidekiq
release: bin/rake db:migrate
