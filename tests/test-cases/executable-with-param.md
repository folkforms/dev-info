# Test case 'executable with param'

## Description

It will execute an executable and substitute a param

## Input args

    foo bar

## Input data

    {
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "open https://local.hubspotqa.com/${staticRoute}"
          },
          "muk": {
            "_description": "Muk description"
          }
        }
      }
    }

## Internal options

    {
      "task": "execute"
    }

## Expected echos

## Expected commands

    open https://local.hubspotqa.com/correct-static-route/:id

## Expected error code

    0
