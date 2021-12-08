# Test case 'test params'

## Description

It prints the executable and substitutes any params it finds

## Input args

    foo bar

## Input data

    {
      "projectDomains": {
        "correct-domain": "correct-app-name"
      },
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "appName=${appName} appRoot=${appRoot} staticRoute=${staticRoute} zkGroup=${zkGroup} domain=${domain}"
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
    Executable: appName=correct-app-name appRoot=correct-app-root staticRoute=correct-static-route/:id zkGroup=correct-zk-group domain=correct-domain

## Expected commands

## Expected error code

    0
