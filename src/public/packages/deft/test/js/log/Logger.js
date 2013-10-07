// Generated by CoffeeScript 1.6.3
/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

describe('Deft.log.Logger', function() {
  describe('log()', function() {
    if (Ext.getVersion('extjs') != null) {
      return describe('logs a message with the specified priority', function() {
        var logFunction;
        logFunction = null;
        beforeEach(function() {
          logFunction = sinon.stub(Ext, 'log');
        });
        afterEach(function() {
          logFunction.restore();
        });
        specify('no priority specified', function() {
          Deft.Logger.log('message', 'info');
          expect(logFunction).to.be.calledOnce.and.calledWith({
            level: 'info',
            msg: 'message'
          });
        });
        specify('verbose', function() {
          Deft.Logger.log('message', 'verbose');
          expect(logFunction).to.be.calledOnce.and.calledWith({
            level: 'info',
            msg: 'message'
          });
        });
        specify('deprecate', function() {
          Deft.Logger.log('message', 'deprecate');
          expect(logFunction).to.be.calledOnce.and.calledWith({
            level: 'warn',
            msg: 'message'
          });
        });
        specify('warn', function() {
          Deft.Logger.log('message', 'warn');
          expect(logFunction).to.be.calledOnce.and.calledWith({
            level: 'warn',
            msg: 'message'
          });
        });
        specify('error', function() {
          Deft.Logger.log('message', 'error');
          expect(logFunction).to.be.calledOnce.and.calledWith({
            level: 'error',
            msg: 'message'
          });
        });
      });
    } else {
      describe('logs a message with the specified priority, when Ext.Logger is available', function() {
        var logFunction;
        logFunction = null;
        beforeEach(function() {
          if (Ext.Logger == null) {
            Ext.define('Ext.Logger', {
              singleton: true,
              log: Ext.emptyFn,
              isMock: true
            });
          }
          return logFunction = sinon.stub(Ext.Logger, 'log');
        });
        afterEach(function() {
          logFunction.restore();
          if (Ext.Logger.isMock) {
            return Ext.Logger = null;
          }
        });
        specify('no priority specified', function() {
          Deft.Logger.log('message', 'info');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'info');
        });
        specify('verbose', function() {
          Deft.Logger.log('message', 'verbose');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'verbose');
        });
        specify('info', function() {
          Deft.Logger.log('message', 'info');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'info');
        });
        specify('deprecate', function() {
          Deft.Logger.log('message', 'deprecate');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'deprecate');
        });
        specify('warn', function() {
          Deft.Logger.log('message', 'warn');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'warn');
        });
        specify('error', function() {
          Deft.Logger.log('message', 'error');
          expect(logFunction).to.be.calledOnce.and.calledWith('message', 'error');
        });
      });
      return describe('silently ignores messages when Ext.Logger is unavailable', function() {
        var logger;
        logger = null;
        beforeEach(function() {
          logger = Ext.Logger;
          Ext.Logger = null;
        });
        afterEach(function() {
          Ext.Logger = logger;
        });
        specify('no priority specified', function() {
          expect(function() {
            return Deft.Logger.log('message', 'info');
          }).to.not["throw"](Error);
        });
        specify('verbose', function() {
          expect(function() {
            return Deft.Logger.log('message', 'verbose');
          }).to.not["throw"](Error);
        });
        specify('deprecate', function() {
          expect(function() {
            return Deft.Logger.log('message', 'deprecate');
          }).to.not["throw"](Error);
        });
        specify('warn', function() {
          expect(function() {
            return Deft.Logger.log('message', 'warn');
          }).to.not["throw"](Error);
        });
        specify('error', function() {
          expect(function() {
            return Deft.Logger.log('message', 'error');
          }).to.not["throw"](Error);
        });
      });
    }
  });
  describe('verbose()', function() {
    var logFunction;
    logFunction = null;
    beforeEach(function() {
      return logFunction = sinon.stub(Deft.Logger, 'log');
    });
    afterEach(function() {
      return logFunction.restore();
    });
    specify('calls log() with specified message with verbose priority', function() {
      Deft.Logger.verbose('message');
      expect(logFunction).to.be.calledOnce.and.calledWith('message', 'verbose');
    });
  });
  describe('info()', function() {
    var logFunction;
    logFunction = null;
    beforeEach(function() {
      return logFunction = sinon.stub(Deft.Logger, 'log');
    });
    afterEach(function() {
      return logFunction.restore();
    });
    specify('calls log() with specified message with info priority', function() {
      Deft.Logger.info('message');
      expect(logFunction).to.be.calledOnce.and.calledWith('message', 'info');
    });
  });
  describe('deprecate()', function() {
    var logFunction;
    logFunction = null;
    beforeEach(function() {
      return logFunction = sinon.stub(Deft.Logger, 'log');
    });
    afterEach(function() {
      return logFunction.restore();
    });
    specify('calls log() with specified message with deprecate priority', function() {
      Deft.Logger.deprecate('message');
      expect(logFunction).to.be.calledOnce.and.calledWith('message', 'deprecate');
    });
  });
  describe('warn()', function() {
    var logFunction;
    logFunction = null;
    beforeEach(function() {
      return logFunction = sinon.stub(Deft.Logger, 'log');
    });
    afterEach(function() {
      return logFunction.restore();
    });
    specify('calls log() with specified message with warn priority', function() {
      Deft.Logger.warn('message');
      expect(logFunction).to.be.calledOnce.and.calledWith('message', 'warn');
    });
  });
  describe('error()', function() {
    var logFunction;
    logFunction = null;
    beforeEach(function() {
      return logFunction = sinon.stub(Deft.Logger, 'log');
    });
    afterEach(function() {
      return logFunction.restore();
    });
    specify('calls log() with specified message with error priority', function() {
      Deft.Logger.error('message');
      expect(logFunction).to.be.calledOnce.and.calledWith('message', 'error');
    });
  });
});
