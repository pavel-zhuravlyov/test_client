# Client for dataset analysis app

This is AngularJS client for dataset analysis API. It has been published at
[https://pavel-zhuravlyov.github.io/test_client/](https://pavel-zhuravlyov.github.io/test_client/)
You can also use it on your local machine.

## Local installation instructions

    $ git clone https://github.com/pavel-zhuravlyov/test_client
    $ cd test_client
    $ npm install
    $ gulp serve

Now you can access app at [http://localhost:3010/](http://localhost:3010/)

To specify API url create file '.env' in applcation root and add line API_URL=*your_url*.
For example: API_URL=https://dataset-analyser.herokuapp.com. Then run *gulp config* task.
