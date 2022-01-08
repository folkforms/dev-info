# Test case 'simple match'

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
      "task": "print",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

    Bar description

## Expected commands

## Expected error code

    0
