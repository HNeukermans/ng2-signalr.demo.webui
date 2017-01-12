webpackJsonp([ 0 ], {
    /***/
    719: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(116), __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(420), __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0), __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(254), __WEBPACK_IMPORTED_MODULE_4__detail_component__ = __webpack_require__(720);
        /* harmony export (binding) */
        __webpack_require__.d(exports, "routes", function() {
            return routes;
        }), /* harmony export (binding) */
        __webpack_require__.d(exports, "DetailModule", function() {
            return DetailModule;
        }), console.log("`Detail` bundle loaded asynchronously");
        // async components must be named routes for WebpackAsyncRoute
        var routes = [ {
            path: "",
            component: __WEBPACK_IMPORTED_MODULE_4__detail_component__.a,
            pathMatch: "full"
        } ], DetailModule = function() {
            function DetailModule() {}
            return DetailModule.routes = routes, DetailModule = __decorate([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__.i)({
                declarations: [ // Components / Directives/ Pipes
                __WEBPACK_IMPORTED_MODULE_4__detail_component__.a ],
                imports: [ __WEBPACK_IMPORTED_MODULE_0__angular_common__.b, __WEBPACK_IMPORTED_MODULE_1__angular_forms__.a, __WEBPACK_IMPORTED_MODULE_3__angular_router__.a.forChild(routes) ]
            }), __metadata("design:paramtypes", []) ], DetailModule);
        }();
    },
    /***/
    720: /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
        /* harmony export (binding) */
        __webpack_require__.d(exports, "a", function() {
            return DetailComponent;
        }), /*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
        console.log("`Detail` component loaded asynchronously");
        var DetailComponent = function() {
            function DetailComponent() {}
            return DetailComponent.prototype.ngOnInit = function() {
                console.log("hello `Detail` component");
            }, DetailComponent = __decorate([ __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__._2)({
                selector: "detail",
                template: "\n    <h1>Hello from Detail</h1>\n    <router-outlet></router-outlet>\n  "
            }), __metadata("design:paramtypes", []) ], DetailComponent);
        }();
    }
});