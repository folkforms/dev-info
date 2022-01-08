# Test case 'duplicate'

## Description

It allows the "_duplicate" option

## Input args

    foo muk

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description"
          },
          "muk": {
            "_duplicate": "foo bar"
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
