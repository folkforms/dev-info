# Test case 'deployName param' 2

## Description

It correctly substitutes the 'deployName' param with 'FooMeta' when FooMeta.yaml file present

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
      "deployFolder": "tests/data/test_deployParam/deploy-with-meta-file"
    }

## Expected echos

## Expected commands

    deployName = FooMeta

## Expected error code

    0
