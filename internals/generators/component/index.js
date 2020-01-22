/**
 * Component Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add an unconnected component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value) ? "A component with this name already exists" : true;
        }

        return "The name is required";
      },
    },
  ],
  actions: data => {
    // Generate {{properCase name}}.js index.js and {{properCase name}}.test.js
    const componentTemplate = "./component/stateless.js.hbs";

    const actions = [
      {
        type: "add",
        path: "../../src/components/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      path: "/components/",
    });

    return actions;
  },
};
