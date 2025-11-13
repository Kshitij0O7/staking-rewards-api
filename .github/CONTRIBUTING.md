# Contributing to Staking Rewards API

First off, thank you for taking the time to contribute 🎉  
We welcome improvements, bug fixes, and new validator query SDKs!

---

## 🚀 How to Contribute

1. **Fork the repo** and create your branch from `main`.
2. **Write clear commit messages** following the [Conventional Commits](#-conventional-commits) standard.
3. **Add tests or examples** if you add new functionality.
4. **Open a Pull Request** with a clear description of your changes.

---

## 📝 Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to automate versioning and changelog generation via **semantic-release**.

Your commit messages must be in the following format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Common Types

- `feat:` → A new feature (triggers a **minor** release).
- `fix:` → A bug fix (triggers a **patch** release).
- `docs:` → Documentation only changes.
- `style:` → Code style changes (formatting, no code change).
- `refactor:` → Code change that neither fixes a bug nor adds a feature.
- `test:` → Adding or correcting tests.
- `chore:` → Maintenance tasks.

### Examples

- `feat: add Polygon validator rewards query`
- `fix: correct BSC validator address validation`
- `docs: update README with BSC streaming examples`
- `feat!: drop Node 14 support` → adds a **BREAKING CHANGE** footer and triggers a **major** release.

---

## 🔧 Local Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/staking-rewards-api.git
   cd staking-rewards-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a feature branch:

   ```bash
   git checkout -b feat/my-new-feature
   ```

4. Run tests / examples as needed.

---

## 🧩 Adding a New Query SDK

1. Create a new file in `queries/<network>/` with naming convention:

   ```
   <result-returned>-query.js
   ```

   Example: `validator-performance-query.js` in `queries/eth/` or `queries/bsc/`

2. Export **both** a query and a stream version:

   ```js
   const validatorPerformanceQueryETH = (address, hoursAgo = 24) => {
     return `
       query MyQuery {
         EVM(network: eth) {
           // ... GraphQL query ...
         }
       }
     `;
   };

   const streamValidatorPerformanceETH = (address) => {
     return `
       subscription {
         EVM(network: eth) {
           // ... GraphQL subscription ...
         }
       }
     `;
   };

   export default validatorPerformanceQueryETH;
   export { streamValidatorPerformanceETH };
   ```

3. Import into `index.js`:

   ```js
   import validatorPerformanceQueryETH from './queries/eth/validator-performance-query.js';
   import { streamValidatorPerformanceETH } from './queries/eth/validator-performance-query.js';
   ```

4. Wrap with SDK functions:

   ```js
   const getValidatorPerformanceETH = async (token, address, hoursAgo = 24) => {
     try {
       const query = validatorPerformanceQueryETH(address, hoursAgo);
       const data = await queryRunner(query, token);
       return data;
     } catch (error) {
       console.error(error);
       throw error;
     }
   };

  const runValidatorPerformanceStreamETH = async (token, address, options = {}) => {
    try {
      const subscription = streamValidatorPerformanceETH(address);
      return streamRunner(subscription, token, {
        autoCloseMs: options.autoCloseMs,
        onData: options.onData,
        onError: options.onError,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
   ```

5. Export the new functions:

   ```js
   export {
     // ... existing exports
     getValidatorPerformanceETH,
     runValidatorPerformanceStreamETH
   };
   ```

6. Add usage examples to the README if relevant.

---

## 🌐 Adding Support for a New Network

1. Create a new directory in `queries/` for the network (e.g., `queries/polygon/`).

2. Create query files following the same pattern as ETH/BSC:
   - `top-validators-query.js`
   - `validator-rewards-query.js`
   - `validator-rewards-stream.js`

3. Add corresponding functions in `index.js`:
   - `getTopValidators<NETWORK>`
   - `getValidatorRewards<NETWORK>`
   - `runValidatorRewardsStream<NETWORK>`
   - `runMultipleValidatorRewardsStream<NETWORK>`
   - `runAllValidatorRewardsStream<NETWORK>`

4. Update the README with network-specific examples.

---

## ✅ Pull Request Checklist

* [ ] Commit messages follow [Conventional Commits](#-conventional-commits).
* [ ] Code builds without errors.
* [ ] Tests/examples added if applicable.
* [ ] Documentation updated (README, comments, or usage).
* [ ] GraphQL queries tested with [Bitquery IDE](https://ide.bitquery.io/?utm_source=github&utm_medium=staking-rewards-api&utm_campaign=contributing).

**Note:** Make sure the commit message starts with either of the `feat:`, `chore:` or `fix:`.

---

## 📦 Release Process

* **Do not bump versions manually.**
* When a PR is merged into `main` and a **GitHub Release** is published,
  [semantic-release](https://semantic-release.gitbook.io/) automatically:

  * Analyzes commits since the last release.
  * Bumps the version (major/minor/patch).
  * Updates `CHANGELOG.md` and `package.json`.
  * Publishes a new version to **npm**.
  * Creates a GitHub Release with notes.

---

## 🔍 Testing Your Queries

Before submitting a PR, make sure to test your GraphQL queries:

1. Visit [Bitquery IDE](https://ide.bitquery.io/?utm_source=github&utm_medium=staking-rewards-api&utm_campaign=contributing)
2. Test your query/subscription with real data
3. Verify the response structure matches your expectations
4. Test edge cases (empty results, invalid addresses, etc.)

---

## 💡 Query Guidelines

- **Use descriptive names**: Function names should clearly indicate what data they return
- **Include error handling**: All functions should have try-catch blocks
- **Document parameters**: Add JSDoc comments for all exported functions
- **Follow existing patterns**: Match the structure and style of existing queries
- **Network-specific**: Keep network-specific logic in separate files/directories

---

Thank you for contributing 💙

