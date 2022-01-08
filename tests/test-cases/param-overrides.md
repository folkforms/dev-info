# Test case 'param override'

## Description

It overrides the params with the given values

## Input args

    foo bar

## Input data

    {
      "paramOverrides": {
        "correct-app-name": {
          "appRoot": "overridden-app-root",
          "staticRoute": "overridden-static-route",
          "zkGroup": "overridden-zk-group"
        }
      },
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "appRoot=${appRoot} staticRoute=${staticRoute} zkGroup=${zkGroup}"
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
    Executable: appRoot=overridden-app-root staticRoute=overridden-static-route zkGroup=overridden-zk-group

## Expected commands

## Expected error code

    0
