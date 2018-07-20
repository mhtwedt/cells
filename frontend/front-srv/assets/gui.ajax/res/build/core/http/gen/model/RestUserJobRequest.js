/**
 * Pydio Cells Rest API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

/**
* The RestUserJobRequest model module.
* @module model/RestUserJobRequest
* @version 1.0
*/

var RestUserJobRequest = (function () {
    /**
    * Constructs a new <code>RestUserJobRequest</code>.
    * @alias module:model/RestUserJobRequest
    * @class
    */

    function RestUserJobRequest() {
        _classCallCheck(this, RestUserJobRequest);

        this.JobName = undefined;
        this.JsonParameters = undefined;
    }

    /**
    * Constructs a <code>RestUserJobRequest</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestUserJobRequest} obj Optional instance to populate.
    * @return {module:model/RestUserJobRequest} The populated <code>RestUserJobRequest</code> instance.
    */

    RestUserJobRequest.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestUserJobRequest();

            if (data.hasOwnProperty('JobName')) {
                obj['JobName'] = _ApiClient2['default'].convertToType(data['JobName'], 'String');
            }
            if (data.hasOwnProperty('JsonParameters')) {
                obj['JsonParameters'] = _ApiClient2['default'].convertToType(data['JsonParameters'], 'String');
            }
        }
        return obj;
    };

    /**
    * @member {String} JobName
    */
    return RestUserJobRequest;
})();

exports['default'] = RestUserJobRequest;
module.exports = exports['default'];

/**
* @member {String} JsonParameters
*/