/**
 * Component Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "HomePage",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value) ? "A container with this name already exists" : true;
        }

        return "The name is required";
      },
    },
    {
      type: "confirm",
      name: "wantReducer",
      default: true,
      message: "Do you want a reducer tuple for this container?",
    },
  ],
  actions: data => {
    // Generate {{properCase name}}.js index.js and {{properCase name}}.test.js
    let containerTemplate = "./container/stateless.js.hbs";

    const actions = [
      {
        type: "add",
        path: "../../src/containers/{{properCase name}}/index.js",
        templateFile: containerTemplate,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      path: "/containers/",
    });

    if (data.wantReducer) {
      actions.push({
        type: "add",
        path: "../../src/containers/{{properCase name}}/reducer.js",
        templateFile: "./container/reducer.js.hbs",
        abortOnFail: true,
      });
      actions.push({
        type: "add",
        path: "../../src/containers/{{properCase name}}/init.js",
        templateFile: "./container/init.js.hbs",
        abortOnFail: true,
      });
    }

    return actions;
  },
};
