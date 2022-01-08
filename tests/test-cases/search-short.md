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
            "_description": "Bar description"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "shortSearch",
      "taskData": "description",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

    Found matches for 'description' in the following nodes:
    foo bar
    foo muk

## Expected commands

## Expected error code

    0
