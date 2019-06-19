/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */

require('dotenv').config();

// https://github.com/octokit/rest.js#node
const Octokit = require('@octokit/rest');
const Table = require('easy-table');

const { API_KEY, ORG_ID } = process.env;

const gh = new Octokit({
  auth: `token ${API_KEY}`,
});

(async () => {
  const teamsList = await gh.paginate('GET /orgs/:org/teams', { org: ORG_ID });
  const table = new Table();
  teamsList.forEach(({ name, id }) => {
    table.cell('Name', name);
    table.cell('ID', id);
    table.newRow();
  });
  console.info(table.toString());
})();
