
errors = {
    "InternalServerError": {
        "message": "Something went wrong",
        "status": 500
    },
     "SchemaValidationError": {
         "message": "Request is missing required fields",
         "status": 400
     },
     "UserNameAlreadyExistsError": {
         "message": "Username already exists",
         "status": 404
     },
     "UpdatingMovieError": {
         "message": "Updating movie added by other is forbidden",
         "status": 403
     },
     "DeletingMovieError": {
         "message": "Deleting movie added by other is forbidden",
         "status": 403
     },
     "UsernameNotExistsError": {
         "message": "User with given username doesn't exists",
         "status": 400
     },
     "EmailAlreadyExistsError": {
         "message": "User with given email address already exists",
         "status": 400
     },
     "UnauthorizedError": {
         "message": "Incorrect password",
         "status": 401
     }
}