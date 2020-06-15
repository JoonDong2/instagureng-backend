"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifier = void 0;

var _util = require("util");

var Axios = _interopRequireWildcard(require("axios"));

var jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var jwkToPem = require('jwk-to-pem');

var cognitoPoolId = process.env.COGNITO_POOL_ID;

if (!cognitoPoolId) {
  throw new Error('env var required for cognito pool');
}

var cognitoIssuer = "https://cognito-idp.ap-northeast-2.amazonaws.com/".concat(cognitoPoolId);
var cacheKeys;

var getPublicKeys = async function getPublicKeys() {
  if (!cacheKeys) {
    var url = "".concat(cognitoIssuer, "/.well-known/jwks.json");
    var publicKeys = await Axios.default.get(url);
    cacheKeys = publicKeys.data.keys.reduce(function (agg, current) {
      var pem = jwkToPem(current);
      agg[current.kid] = {
        instance: current,
        pem: pem
      };
      return agg;
    }, {});
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

var verifyPromised = (0, _util.promisify)(jsonwebtoken.verify.bind(jsonwebtoken));

var verifier = async function verifier(request) {
  var result;

  try {
    //console.log("user claim verfiy invoked for ".concat(JSON.stringify(request)));
    var token = request.token;
    var tokenSections = (token || '').split('.');

    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }

    var headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    var header = JSON.parse(headerJSON);
    var keys = await getPublicKeys();
    var key = keys[header.kid];

    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }

    var claim = await verifyPromised(token, key.pem);
    var currentSeconds = Math.floor(new Date().valueOf() / 1000);

    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('claim is expired or invalid');
    }

    if (claim.iss !== cognitoIssuer) {
      throw new Error('claim issuer is invalid');
    }
    
    if (claim.token_use !== 'access' && claim.token_use !== 'id') {
      throw new Error('claim use is not access');
    }

    //console.log("claim confirmed for ".concat(claim.username));
    result = {
      userName: claim['cognito:username'],
      email: claim.email,
      isValid: true
    };
  } catch (error) {
    result = {
      userName: '',
      clientId: '',
      error: error,
      isValid: false
    };
  }

  return result;
};

exports.verifier = verifier;