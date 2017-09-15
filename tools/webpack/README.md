# z-frontend-webpack
 
Provides a default webpack.client.config for apps. That includes hot-reloading
and our default typescript and babel configuration. 
 
## Installation

Add `"z-frontend-webpack": "*"` to your app's package.json

## Customizing

The project comes with its own `webpack.client.config` but you could override anythign there 
by defining your own `webpack.client.config` on your own project. It's recommended to import this
get the default values and return a new object instead of starting from scratch. 