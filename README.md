# AWS serverless lambda development kit

### minimalist development setup for lambdas

### what does this starter do ?

- the starter gives you a way to develop lambda functions locally and then package them to be deployed to the aws lambda runtime
- the starter does not automatically publish/deploy the lambdas it only packages the lambda code and common code into `.zip` files to be deployed they need to deployed manually

### how to use the starter ?

- write your functions in the `src/functions` directory
- every directory in the functions directory is treated as an individual function and is packaged saperately
- write common code in `src/common` directory this directory is packaged along with node_modules into one `layer.zip` file and this is supposed to deployed as a layer in lambda
- write tests in the `tests` directory as shown with the hello example these are not packaged with your code
- use the `build:layers` and `build:functions` to build/package the `.zip` files
- every function is packaged into its own `.zip` file with the name same as the folder name. This zip file contains the contents of the function folder
- then take the `.zip` files from the `build` directory and deploy them to lambda
- make sure you setup `NODE_ENV` to `production` after deploying the lambda function so the `common` directory is loaded correctly
- look at the given example function and tests to get a better understanding
- some utilities for server api are included in the utils folder just as an example of how to use code common to multiple functions

### features to be added

- [ ] s3 sync capability
- [ ] deployment capability
