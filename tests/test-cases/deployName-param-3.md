# Test case 'deployName param' 3

## Description

It correctly substitutes the 'deployName' param with 'Foo' when no All or Meta files present

## Input args

    foo

## Input data

    {
      "data": {
        "foo": {
          "_description": "Foo description",
          "_executable": "deployName = ${deployName}"
        }
      }
    }

## Internal options

    {
      "task": "execute",
      "deployFolder": "tests/data/test_deployParam/deploy-with-one-file"
    }

## Expected echos

## Expected commands

    deployName = Foo

## Expected error code

    0
