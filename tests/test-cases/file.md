# Test case 'file'

## Description

It allows the "_file" option

## Input args

    foo bar

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_file": "tests/data/test-file-option.txt"
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

    This file is used to test the '_file' option.

## Expected commands

## Expected error code

    0
