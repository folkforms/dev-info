# Test case 'search-description'

## Description

Search function finds the given text in a description.

## Input args

   n/a

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description toast"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "search",
      "taskData": "toast"
    }

## Expected echos

    foo bar:\n\nBar description toast

## Expected commands

## Expected error code

    0
