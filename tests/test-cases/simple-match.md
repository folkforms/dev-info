# Test case 1

## Description

It finds a simple match

## Input args

    foo bar

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
      "task": "print"
    }

## Expected echos

    Bar description

## Expected commands

## Expected error code

    0
