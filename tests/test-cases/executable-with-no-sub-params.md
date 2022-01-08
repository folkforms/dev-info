# Test case 'executable with --no-sub-params on'

## Description

It will execute an executable and not substitute a param if --no-sub-params is on

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
      "task": "execute",
      "subParams": false,
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

## Expected commands

    open https://local.hubspotqa.com/${staticRoute}

## Expected error code

    0
