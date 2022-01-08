# Test case 'deployName param' 1

## Description

It correctly substitutes the 'deployName' param with 'FooAll' when FooAll.yaml file present

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
      "deployFolder": "tests/data/test_deployParam/deploy-with-all-file"
    }

## Expected echos

## Expected commands

    deployName = FooAll

## Expected error code

    0
