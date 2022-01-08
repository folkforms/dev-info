# Test case 'static routes 1'

## Description

It gets the staticRoutes param from the yaml file

## Input args

    foo bar

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${staticRoute}"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "print",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

    Bar description
    Executable: Bar executable param=correct-static-route/:id

## Expected commands

## Expected error code

    0
