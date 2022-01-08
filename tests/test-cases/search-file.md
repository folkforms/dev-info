# Test case 'search-file'

## Description

Search function finds the given text in a file.

## Input args

   (none)

## Input data

     {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description"
          },
          "muk": {
            "_file": "./tests/data/test-file-option.txt"
          }
        }
      }
    }

## Internal options

    {
      "task": "search",
      "taskData": "this file is used to",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

    foo muk (./tests/data/test-file-option.txt):\n\nThis file is used to test the '_file' option.\n\n\n----

## Expected commands

## Expected error code

    0
