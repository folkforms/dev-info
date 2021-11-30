# dev-info

Used to provide help text or index all the things you need to remember in a new job. You have a single JSON file containing all the info, as opposed to having dozens of text files everywhere.

1. Install `dev-info` globally: `yarn add --global dev-info`
2. Create `~/.dev-info.json`

```
{
  "data": {
    "frontend": {
      "run": {
        "_description": "The frontend uses yarn. Use 'yarn start' to run it.",
        "_executable: "yarn start"
      },
      "tests": {
        "_description": "Description of the frontend tests. Use 'yarn test' to run the tests.",
        "_executable: "yarn test"
      },
      "deploy": {
        "_duplicate": "misc deploy"
      }
    },
    "backend": {
      "build": {
        "_description": "The backend uses maven.",
        "_executable: "mvn compile"
      },
      "run": {
        "_description": "Run StartServer.jar to run the backend.",
        "_executable: "java -jar StartServer.jar"
      },
      "tests": {
        "_description": "Description of the backend tests.",
        "_executable: "mvn clean verify"
      },
      "deploy": {
        "_duplicate": "misc deploy"
      }
    },
    "misc": {
      "deploy": {
        "_description": "How to deploy stuff"
      }
    }
  }
}
```

3. Type `dev` for a list of topics

```
frontend
    run
    tests
backend
    build
    run
    tests
```

4. Type `dev frontend run` for detail

```
The frontend uses yarn.

Executable: yarn start
```

5. Use the `-x` argument to execute a command. For example, `dev frontend run -x` will execute whatever is in the `_executable` field, in this case `yarn start`.

## Data options

- `_description`: Text that describes the given topic
- `_executable`: An executable command that will be run when the `-x` option is specified
- `_duplicate`: Link this entry to another entry
- `_file`: Use the given file's contents as the description (and optionally executable as well)

### _file options

Files loaded via the `_file` option can denote executables in the following two forms:

```
    ## Executable

    foo
```
or
```
    Executable: foo
```

## Parameters

Most of the parameters are based on values taken from the HubSpot project yaml configuration name i.e. "hubspot.deploy/my-project.yaml".

You can override parameters using `projectParamsMap.param` if it's not getting the correct value.

The `${domain}` param will be mapped to a value from `projectDomainMap`. For example:
```
    "projectDomainMap": {
      "foo-domain": [ "foo-project-a", "foo-project-b" ],
      "bar-domain": [ "bar-project-a", "bar-project-b" ]
    }
```
