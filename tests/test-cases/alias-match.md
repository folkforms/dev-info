# Test case 'alias match'

## Description

It finds an aliased match

## Input args

    f b

## Input data

    {
      "aliases": {
        "foo": [ "f" ],
        "bar": [ "b" ]
      },
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
