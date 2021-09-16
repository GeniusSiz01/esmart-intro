"use strict";

var _assert = require("assert");

var _pg = _interopRequireDefault(require("pg"));

var _CreateWasteCollectorAccount = _interopRequireDefault(require("../services/accounts/CreateWasteCollectorAccount.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Pool = _pg["default"].Pool;
var connectionString = process.env.DATABSE_URL;
var pool = new Pool({
  connectionString: connectionString
});
describe("Testing the create account functionality", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('Should return that "James" was added as a new account', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var createAccountInstance, james, results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            createAccountInstance = new _CreateWasteCollectorAccount["default"]();
            james = {
              firstName: "James",
              lastName: "Hope",
              location: "Midrand",
              cellNumber: "0812828250",
              email: "james@gmail.com",
              idNumber: 9208245617088,
              gender: "Male",
              age: 30
            };
            results = createAccountInstance.create(james);
            (0, _assert.equal)(0, 0);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});