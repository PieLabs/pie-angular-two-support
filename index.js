(function (pie) {

  function loadScope(element) {
    return {};
  }

  function setNgProperty(scope, key, data) {
    scope[key] = data;
    console.log("setting", data);
  }

  function configureNgModule($provide) {
  }

  pie.addFramework('angular', {
    definePrototype: function (name, moduleName) {

      moduleName = moduleName || name;

      var elementPrototype = Object.create(HTMLElement.prototype);

      elementPrototype.angularModuleName = moduleName;


      function defineProperty(name){
        var key = '__' + name;
        Object.defineProperty(elementPrototype, name, {
          get: function () {
            return this[key];
          },
          set: function (d) {
            this[key] = d;
            if (this.__scope) {
              setNgProperty(this.__scope, name, this[key]);
            }
          }
        });
      }

      defineProperty('env');
      defineProperty('question');
      defineProperty('session');
      defineProperty('outcome');

      function create() {
        // angular.module(this.angularModuleName)
        //   .config(['$provide', configureNgModule.bind(this)]);
        //
        //
        // angular.bootstrap(this, [this.angularModuleName]);
        // this.__scope = loadScope(this);
        //
        // if (this.__question) {
        //   setNgProperty(this.__scope, 'question', this.__question);
        // }
        //
        // if (this.__session) {
        //   setNgProperty(this.__scope, 'session', this.__session);
        // }
        //
        // if (this.__env) {
        //   setNgProperty(this.__scope, 'env', this.__env);
        // }
      }

      elementPrototype.createdCallback = function () {
        console.log('created!', this, arguments);
        create.bind(this)();
      };

      return elementPrototype;

    }
  });

})(pie);