# Test case 'project domains'

## Description

It maps the 'projectNotes' param correctly based on the projectDomains value in .dev-info.json

## Input args

    foo bar

## Input data

    {
      "projectDomains": {
         "correct-app-domain": [
           "foo-app",
           "correct-app-name",
           "bar-app"
         ]
      },
      "projectNotes": {
        "correct-app-name": {
          "foo": {
            "bar": {
              "_note": "Find `fooId` Foo keyspace > foo table > fooId column"
            }
          }
        }
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
      "task": "print",
      "deployFolder": "tests/data/hubspot.deploy"
    }

## Expected echos

    Bar description
    Notes: Find `fooId` Foo keyspace > foo table > fooId column
    Executable: Bar executable param=correct-app-domain

## Expected commands

## Expected error code

    0
