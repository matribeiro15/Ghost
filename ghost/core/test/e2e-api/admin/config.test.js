const assert = require('assert/strict');
const {agentProvider, fixtureManager, matchers, configUtils} = require('../../utils/e2e-framework');
const {anyContentVersion, anyEtag, anyContentLength, stringMatching} = matchers;

/**
 * This is a snapshot test for the happy path of the config API
 * It does not test the full range of possible config values
 * as that should be tested in the unit tests for the public-config service
 */
describe('Config API', function () {
    let agent;

    before(async function () {
        agent = await agentProvider.getAdminAPIAgent();
        await fixtureManager.init('users');
    });

    afterEach(async function () {
        await configUtils.restore();
    });

    describe('As Unauthorized User', function () {
        it('Cannot fetch the config endpoint', async function () {
            await agent.get('/config/')
                .expectStatus(403);
        });
    });

    describe('As Owner', function () {
        before(async function () {
            await agent.loginAsOwner();
        });

        it('Can retrieve config and all expected properties', async function () {
            await agent
                .get('/config/')
                .expectStatus(200)
                .matchBodySnapshot({
                    config: {
                        database: stringMatching(/sqlite3|mysql|mysql2/),
                        environment: stringMatching(/^testing/),
                        version: stringMatching(/\d+\.\d+\.\d+/)
                    }
                })
                .matchHeaderSnapshot({
                    'content-version': anyContentVersion,
                    'content-length': anyContentLength, // Length can differ slightly based on the database, environment and version values
                    etag: anyEtag
                });
        });

        it('Will receive exploreTestimonialsUrl if set', async function () {
            // This is only set in production config, so we override it to test it works
            configUtils.set('explore:testimonials_url', 'https://testing.com/that/this/is/set/correctly');
            await agent
                .get('/config/')
                .expectStatus(200)
                .expect(({body}) => {
                    assert.equal(body.config.exploreTestimonialsUrl, 'https://testing.com/that/this/is/set/correctly');
                });
        });
    });
});
