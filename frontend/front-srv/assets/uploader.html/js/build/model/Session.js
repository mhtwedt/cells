'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pydio = require('pydio');

var _pydio2 = _interopRequireDefault(_pydio);

var _api = require('pydio/http/api');

var _api2 = _interopRequireDefault(_api);

var _FolderItem2 = require('./FolderItem');

var _FolderItem3 = _interopRequireDefault(_FolderItem2);

var _Configs = require('./Configs');

var _Configs2 = _interopRequireDefault(_Configs);

var _restApi = require('pydio/http/rest-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Session = function (_FolderItem) {
    _inherits(Session, _FolderItem);

    function Session() {
        _classCallCheck(this, Session);

        var _this = _possibleConstructorReturn(this, (Session.__proto__ || Object.getPrototypeOf(Session)).call(this, 'folder'));

        _this._status = 'analyse';
        delete _this.children.pg[_this.getId()];
        return _this;
    }

    _createClass(Session, [{
        key: 'getFullPath',
        value: function getFullPath() {
            return '/';
        }
    }, {
        key: 'treeViewFromMaterialPath',
        value: function treeViewFromMaterialPath(merged) {
            var tree = [];
            Object.keys(merged).forEach(function (path) {

                var pathParts = path.split('/');
                pathParts.shift();
                var currentLevel = tree;
                pathParts.forEach(function (part) {
                    var existingPath = currentLevel.find(function (data) {
                        return data.name === part;
                    });
                    if (existingPath) {
                        currentLevel = existingPath.children;
                    } else {
                        var newPart = {
                            name: part,
                            item: merged[path],
                            path: path,
                            children: []
                        };
                        currentLevel.push(newPart);
                        currentLevel = newPart.children;
                    }
                });
            });
            return tree;
        }
    }, {
        key: 'prepare',
        value: function prepare() {
            var _this2 = this;

            var overwriteStatus = _Configs2.default.getInstance().getOption("DEFAULT_EXISTING", "upload_existing");

            if (overwriteStatus !== 'rename' && overwriteStatus !== 'alert') {
                this.setStatus('ready');
                return Promise.resolve();
            }

            var api = new _restApi.TreeServiceApi(_api2.default.getRestClient());
            var request = new _restApi.RestGetBulkMetaRequest();
            request.NodePaths = [];

            this.walk(function (item) {
                request.NodePaths.push(item.getFullPath());
            }, function () {
                return true;
            }, 'file');

            return new Promise(function (resolve, reject) {
                var proms = [];
                api.bulkStatNodes(request).then(function (response) {
                    if (response.Nodes && response.Nodes.length) {
                        if (overwriteStatus === 'alert') {
                            if (global.confirm(_pydio2.default.getInstance().MessageHash[124])) {
                                _this2.setStatus('ready');
                                resolve();
                                return;
                            }
                        }
                        _this2.walk(function (item) {
                            if (response.Nodes.map(function (n) {
                                return n.Path;
                            }).indexOf(item.getFullPath()) !== -1) {
                                proms.push(new Promise(function () {
                                    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve1) {
                                        var newPath, parts, newRelativePath;
                                        return regeneratorRuntime.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        _context.next = 2;
                                                        return _this2.newPath(item.getFullPath());

                                                    case 2:
                                                        newPath = _context.sent;
                                                        parts = newPath.split('/');

                                                        parts.shift();
                                                        newRelativePath = parts.join('/');

                                                        console.log('Update relative path with index', newRelativePath);
                                                        item.setRelativePath(newRelativePath);
                                                        resolve1();

                                                    case 9:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this2);
                                    }));

                                    return function (_x) {
                                        return _ref.apply(this, arguments);
                                    };
                                }()));
                            }
                        }, function () {
                            return true;
                        }, 'file');
                    }
                    Promise.all(proms).then(function () {
                        _this2.setStatus('ready');
                        resolve(proms);
                    });
                });
            });
        }
    }, {
        key: 'newPath',
        value: function newPath(fullpath) {
            var _this3 = this;

            return new Promise(function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve) {
                    var lastSlash, pos, path, ext, newPath, counter, exists;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    lastSlash = fullpath.lastIndexOf('/');
                                    pos = fullpath.lastIndexOf('.');
                                    path = fullpath;
                                    ext = '';

                                    if (pos > -1 && lastSlash < pos && pos > lastSlash + 1) {
                                        path = fullpath.substring(0, pos);
                                        ext = fullpath.substring(pos);
                                    }

                                    newPath = fullpath;
                                    counter = 1;
                                    exists = true;

                                case 8:
                                    if (!exists) {
                                        _context2.next = 16;
                                        break;
                                    }

                                    newPath = path + '-' + counter + ext;
                                    counter++;
                                    _context2.next = 13;
                                    return _this3.nodeExists(newPath);

                                case 13:
                                    exists = _context2.sent;
                                    _context2.next = 8;
                                    break;

                                case 16:

                                    resolve(newPath);

                                case 17:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this3);
                }));

                return function (_x2) {
                    return _ref2.apply(this, arguments);
                };
            }());
        }
    }, {
        key: 'nodeExists',
        value: function nodeExists(fullpath) {
            return new Promise(function (resolve) {
                var api = new _restApi.TreeServiceApi(_api2.default.getRestClient());
                var request = new _restApi.RestGetBulkMetaRequest();
                request.NodePaths = [fullpath];
                api.bulkStatNodes(request).then(function (response) {
                    if (response.Nodes && response.Nodes[0]) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }).catch(function () {
                    return resolve(false);
                });
            });
        }
    }]);

    return Session;
}(_FolderItem3.default);

exports.default = Session;
