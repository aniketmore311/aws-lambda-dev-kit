# AWS serverless lambda development kit

### minimalist development setup for lambdas

### what does this starter do ?

- the starter gives you a way to develop lambda functions locally and then package them to be deployed to the aws lambda runtime
- the starter does not automatically publish/deploy the lambdas it only packages the lambda code and common code into `.zip` files to be deployed they need to deployed manually

### how to use the starter ?

- write your functions in the `src/functions` directory 
- every directory in the functions directory is treated as a function and is packaged saperately
- write common code in `src/common` directory this directory is packaged along with node_modules into one `layer.zip` file and this is supposed to deployed as a layer in lambda
- write tests in the function directory as shown with the hello-world example
- use the `build:layer` and `build:functions` to build/package the `.zip` files
- every function is packaged into its own `.zip` file with the name same as the folder name

### functions to be added
- [ ] s3 sync capability
- [ ] deployment capability