# Test case 'project params map'

## Description

User can override properties for a given project using the projectParamMap value in .dev-info.json

## Input args

    foo bar

## Input data

    {
      "projectParamMap": {
         "staticRoute": "override-static-route"
      },
      "data": {
        "foo": {
          "bar": {
            "_description": "Bar description",
            "_executable": "Bar executable param=${staticRoute}"
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
    Executable: Bar executable param=override-static-route

## Expected commands

## Expected error code

    0
