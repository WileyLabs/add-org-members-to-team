# Add Org Members to Team

GitHub doesn't have an organizational-wide "default" team...yet. So, this
script allows you to find out who's in the org, but not in your orgs "default"
team.

GitHub does offer a similar
["Internal" repository type](https://help.github.com/en/articles/creating-an-internal-repository),
but that may not suite everyone's needs (and it's currently in beta).
Regardless, this is still a useful tool for adding members from one list to the
other (for a range of reasons).

Essentially, the script compares the list of organization members against the
list of team members, and if that results in a non-zero number, it adds them.
No more. No less.

## Usage

The script uses three environment variables: `API_KEY`, `ORG_ID`, and `TEAM_ID`.

`API_KEY` should be set to a [personal access token](https://github.com/settings/tokens)
with `admin:org` permissions.

`ORG_ID` is the short name/id of your organization (i.e. `wileylabs`).

`TEAM_ID` should be set to your "default" team's ID (found via the API). If you
don't already know the team ID, you can use `node list-teams.js` to see the
list for the org you set with `ORG_ID`.

If you'd rather not set these every time (or want to store them locally for
development, for example), you can copy `.env.example` to `.env` and set
the proper values.

## License
MIT
