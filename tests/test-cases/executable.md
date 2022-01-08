# Test case 'executable'

## Description

It will execute the executable

## Input args

    foo bar

## Input data

    {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "execute",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

## Expected commands

    Bar executable

## Expected error code

    0
