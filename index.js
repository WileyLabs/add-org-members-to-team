/* eslint no-console: ["error", { allow: ["info", "warn", "error"] }] */

require('dotenv').config();

// https://github.com/octokit/rest.js#node
const Octokit = require('@octokit/rest');

const { API_KEY, ORG_ID, TEAM_ID } = process.env;

const gh = new Octokit({
  auth: `token ${API_KEY}`,
});

(async () => {
  const teamMembers = await gh.paginate('GET /teams/:team_id/members',
    { team_id: TEAM_ID });
  const orgMembers = await gh.paginate('GET /orgs/:org/members',
    { org: ORG_ID });
  console.info(`${teamMembers.length} vs. ${orgMembers.length} ...so missing: ${orgMembers.length - teamMembers.length}`);

  const teamMembersLogins = teamMembers.reduce((acc, i) => {
    acc.push(i.login);
    return acc;
  }, []);

  const orgMembersObj = orgMembers.reduce((acc, i) => {
    // collect missing logins
    if (teamMembersLogins.indexOf(i.login) === -1) {
      acc[i.login] = i;
      return acc;
    }
    return acc;
  }, {});
  const missingLogins = Object.keys(orgMembersObj);

  if (missingLogins.length > 0) {
    console.info(`found ${missingLogins.length} from all-wiley\n`, missingLogins);

    // TODO: possibly make this a per-login confirmation step
    // TODO: ...haven't tested rate limiting here...so...yeah.
    missingLogins.forEach((login) => {
      try {
        const addition = gh.request('PUT /teams/:team_id/memberships/:username',
          {
            team_id: TEAM_ID,
            username: login,
          });
        console.info(login, addition);
      } catch (err) {
        console.error(err);
      }
    });
  } else {
    console.info('Excellent. Everyone is on the team!');
  }
})();
