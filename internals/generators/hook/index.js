/**
 * Hook Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a hook",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "useHook",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(`${value}`) ? "A hook with this name already exists" : true;
        }

        return "The name is required";
      },
    },
  ],
  actions: data => {
    // Generate {{properCase name}}.js index.js and {{properCase name}}.test.js
    let hookTemplate = "./hook/hook.js.hbs";

    const actions = [
      {
        type: "add",
        path: "../../src/hooks/{{ name }}/index.js",
        templateFile: hookTemplate,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      path: "/hooks/",
    });

    return actions;
  },
};
