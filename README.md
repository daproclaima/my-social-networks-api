# my-social-network-api

##  It's a CRUDS api for my social networks.


##  Steps for project intsallation 
Install the dependencies

	$ yarn install

And have mongoDB server runing by running the process in an another terminal tab or window as below

	$ mongod

Then start the app

    $yarn  start
    
# How to use the API
For next steps, you should use <a href='https://www.postman.com/'>postman</a> and MongoDB compass

Inside my-social-media-api is a CRUD request sets for all models. Import the file social-network-api mongoDB payload-validator full.postman_collection.json into your postman instance.

Here is the proper http requests execution order:
	- Create a document by runing a POST request on /{entities}/create. Repeat it twice to have more than one element in collection
	- Show a document by running a GET request on /{entities}/show/:id.
	- Update a document by runing a PUT request on /{entities}/update/:id.
	- List all the documents of a collection by running a GET request on /{entities}/list
	- Delete a document by running a DELETE request on /{entities}/delete/:id


