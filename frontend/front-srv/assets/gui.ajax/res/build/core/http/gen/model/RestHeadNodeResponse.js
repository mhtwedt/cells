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

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

/**
* The RestHeadNodeResponse model module.
* @module model/RestHeadNodeResponse
* @version 1.0
*/

var RestHeadNodeResponse = (function () {
    /**
    * Constructs a new <code>RestHeadNodeResponse</code>.
    * @alias module:model/RestHeadNodeResponse
    * @class
    */

    function RestHeadNodeResponse() {
        _classCallCheck(this, RestHeadNodeResponse);

        this.Node = undefined;
    }

    /**
    * Constructs a <code>RestHeadNodeResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/RestHeadNodeResponse} obj Optional instance to populate.
    * @return {module:model/RestHeadNodeResponse} The populated <code>RestHeadNodeResponse</code> instance.
    */

    RestHeadNodeResponse.constructFromObject = function constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RestHeadNodeResponse();

            if (data.hasOwnProperty('Node')) {
                obj['Node'] = _TreeNode2['default'].constructFromObject(data['Node']);
            }
        }
        return obj;
    };

    /**
    * @member {module:model/TreeNode} Node
    */
    return RestHeadNodeResponse;
})();

exports['default'] = RestHeadNodeResponse;
module.exports = exports['default'];
