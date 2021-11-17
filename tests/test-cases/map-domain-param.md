# Test case 'map domain param'

## Description

It maps the 'domain' param correctly based on the projectDomainMap value in .dev-info.json

## Input args

    foo bar

## Input data

    {
      "projectDomainMap": {
         "correct-app-name": "correct-app-domain"
      },
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${domain}"
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
    Executable: Bar executable param=correct-app-domain

## Expected commands

## Expected error code

    0
