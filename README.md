# dev-info

Used to provide help text or index all the things you need to remember in a new job. As opposed to having dozens of text files everywhere, you have a single JSON file containing all the info.

1. Install `dev-info` globally: `yarn add --global dev-info`
2. Create `~/.dev.data.json`

```
{
  "data": {
    "frontend": {
      "run": {
        "_description": "The frontend uses yarn.",
        "_executable: "yarn start"
      },
      "tests": {
        "_description": "Description of the frontend tests.",
        "_executable: "yarn test"
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
