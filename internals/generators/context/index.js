/**
 * Context Generator
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
      default: "HomePageContext",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value) ? "A context with this name already exists" : true;
        }

        return "The name is required";
      },
    },
  ],
  actions: data => {
    // Generate {{properCase name}}.js index.js
    let containerTemplate = "./context/context.js.hbs";

    const actions = [
      {
        type: "add",
        path: "../../src/contexts/{{properCase name}}/index.js",
        templateFile: containerTemplate,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      path: "/contexts/",
    });

    return actions;
  },
};
