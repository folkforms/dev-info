# Test case 'print executable with param'

## Description

It prints the executable and substitutes the param if available

## Input args

    foo bar

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${appRoot} param=${staticRoute}"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "print"
    }

## Expected echos

    Bar description
    Executable: Bar executable param=correct-app-root param=correct-static-route

## Expected commands

## Expected error code

    0
