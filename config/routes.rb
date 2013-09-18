QuestioningAuthority::Application.routes.draw do
  resources :terms
  resources :samples
  root :to => "samples#index"
end
