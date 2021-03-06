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

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ApiClient = require('../ApiClient');

var _ApiClient2 = _interopRequireDefault(_ApiClient);

/**
* Enum class ServiceResourcePolicyAction.
* @enum {}
* @readonly
*/

var ServiceResourcePolicyAction = (function () {
    function ServiceResourcePolicyAction() {
        _classCallCheck(this, ServiceResourcePolicyAction);

        this.ANY = "ANY";
        this.OWNER = "OWNER";
        this.READ = "READ";
        this.WRITE = "WRITE";
        this.EDIT_RULES = "EDIT_RULES";
    }

    /**
    * Returns a <code>ServiceResourcePolicyAction</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ServiceResourcePolicyAction} The enum <code>ServiceResourcePolicyAction</code> value.
    */

    ServiceResourcePolicyAction.constructFromObject = function constructFromObject(object) {
        return object;
    };

    return ServiceResourcePolicyAction;
})();

exports["default"] = ServiceResourcePolicyAction;
module.exports = exports["default"];

/**
 * value: "ANY"
 * @const
 */

/**
 * value: "OWNER"
 * @const
 */

/**
 * value: "READ"
 * @const
 */

/**
 * value: "WRITE"
 * @const
 */

/**
 * value: "EDIT_RULES"
 * @const
 */
