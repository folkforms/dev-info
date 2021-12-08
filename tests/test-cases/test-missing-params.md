# Test case 'test missing params'

## Description

It prints the executable despite the param not being available

## Input args

    foo bar

## Input data

    {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${foobar}"
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
    Executable: Bar executable param=foobar

## Expected commands

## Expected error code

    0
