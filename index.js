import { queryRunner } from "./query-runner.js";
import { streamRunner } from "./stream-runner.js";
import validatorRewardsQueryETH from './queries/eth/validator-rewards-query.js';
import validatorRewardsQueryBSC from './queries/bsc/validator-rewards-query.js';
import topValidatorsQueryETH from './queries/eth/top-validators-query.js';
import topValidatorsQueryBSC from './queries/bsc/top-validators-query.js';
import { streamValidatorRewardsETH, streamMultipleValidatorRewardsETH, streamAllValidatorRewardsETH } from './queries/eth/validator-rewards-stream.js';
import { streamValidatorRewardsBSC, streamMultipleValidatorRewardsBSC, streamAllValidatorRewardsBSC } from './queries/bsc/validator-rewards-stream.js';



/**
 * getTopValidatorsETH
 * Get top validators on Ethereum network
 * @param {string} token - your Bitquery OAuth token
 * @param {number} hoursAgo - hours to look back (default: 24)
 * @param {number} limit - number of validators to return (default: 10)
 * @returns {JSON Object} - JSON object that contains top validators data
 */
const getTopValidatorsETH = async (token, hoursAgo = 24, limit = 10) => {
    try {
        const query = topValidatorsQueryETH(hoursAgo, limit);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * getTopValidatorsBSC
 * Get top validators on BSC network
 * @param {string} token - your Bitquery OAuth token
 * @param {number} hoursAgo - hours to look back (default: 24)
 * @param {number} limit - number of validators to return (default: 10)
 * @returns {JSON Object} - JSON object that contains top validators data
 */
const getTopValidatorsBSC = async (token, hoursAgo = 24, limit = 10) => {
    try {
        const query = topValidatorsQueryBSC(hoursAgo, limit);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * getValidatorRewardsETH
 * Get validator rewards on Ethereum network
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the validator address
 * @param {number} hoursAgo - hours to look back (default: 24)
 * @returns {JSON Object} - JSON object that contains validator rewards data
 */
const getValidatorRewardsETH = async (token, address, hoursAgo = 24) => {
    try {
        const query = validatorRewardsQueryETH(address, hoursAgo);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * getValidatorRewardsBSC
 * Get validator rewards on BSC network
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the validator address
 * @param {number} hoursAgo - hours to look back (default: 24)
 * @returns {JSON Object} - JSON object that contains validator rewards data
 */
const getValidatorRewardsBSC = async (token, address, hoursAgo = 24) => {
    try {
        const query = validatorRewardsQueryBSC(address, hoursAgo);
        const data = await queryRunner(query, token);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * runValidatorRewardsStreamETH
 * Stream live validator rewards data for a single validator on Ethereum
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the validator address
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runValidatorRewardsStreamETH = async (token, address, options = {}) => {
    try {
        const subscription = streamValidatorRewardsETH(address);
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

/**
 * runMultipleValidatorRewardsStreamETH
 * Stream live validator rewards data for multiple validators on Ethereum
 * @param {string} token - your Bitquery OAuth token
 * @param {string[]} addresses - array of validator addresses
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runMultipleValidatorRewardsStreamETH = async (token, addresses, options = {}) => {
    try {
        const subscription = streamMultipleValidatorRewardsETH(addresses);
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

/**
 * runAllValidatorRewardsStreamETH
 * Stream live validator rewards data for all validators on Ethereum
 * @param {string} token - your Bitquery OAuth token
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runAllValidatorRewardsStreamETH = async (token, options = {}) => {
    try {
        const subscription = streamAllValidatorRewardsETH();
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

/**
 * runValidatorRewardsStreamBSC
 * Stream live validator rewards data for a single validator on BSC
 * @param {string} token - your Bitquery OAuth token
 * @param {string} address - the validator address
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runValidatorRewardsStreamBSC = async (token, address, options = {}) => {
    try {
        const subscription = streamValidatorRewardsBSC(address);
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

/**
 * runMultipleValidatorRewardsStreamBSC
 * Stream live validator rewards data for multiple validators on BSC
 * @param {string} token - your Bitquery OAuth token
 * @param {string[]} addresses - array of validator addresses
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runMultipleValidatorRewardsStreamBSC = async (token, addresses, options = {}) => {
    try {
        const subscription = streamMultipleValidatorRewardsBSC(addresses);
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

/**
 * runAllValidatorRewardsStreamBSC
 * Stream live validator rewards data for all validators on BSC
 * @param {string} token - your Bitquery OAuth token
 * @param {object} options - optional settings: { autoCloseMs, onData, onError }
 * @returns {Promise<WebSocket>} - active WebSocket connection
 */
const runAllValidatorRewardsStreamBSC = async (token, options = {}) => {
    try {
        const subscription = streamAllValidatorRewardsBSC();
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

export {
    getTopValidatorsETH,
    getTopValidatorsBSC,
    getValidatorRewardsETH,
    getValidatorRewardsBSC,
    runValidatorRewardsStreamETH,
    runMultipleValidatorRewardsStreamETH,
    runAllValidatorRewardsStreamETH,
    runValidatorRewardsStreamBSC,
    runMultipleValidatorRewardsStreamBSC,
    runAllValidatorRewardsStreamBSC
};
