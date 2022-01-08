# Test case 'static routes 2'

## Description

It gets the staticRoutesV2 param from the yaml file

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
      "deployFolder": "tests/data/hubspot.deploy2"
    }

## Expected echos

    Bar description
    Executable: Bar executable param=correct-static-route-v2/:id

## Expected commands

## Expected error code

    0
