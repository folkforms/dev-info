# Test case 'executable with param'

## Description

It will execute an executable and substitute a param

## Input args

    foo bar

## Input data

    {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${appRoot}"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "execute"
    }

## Expected echos

## Expected commands

    Bar executable param=correct-app-root

## Expected error code

    0
