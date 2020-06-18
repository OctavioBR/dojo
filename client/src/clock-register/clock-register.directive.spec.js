'use strict';

describe('dojo clock register directive', function () {
  var authenticationForm,
      $compile,
      $rootScope,
      $httpBackend,
      $templateCache,
      $timeout,
      element,
      view,
      hitThePointBtn;

  beforeEach(function () {
    module('dojo');
    module('dojo.templates');

    inject(function (_$compile_, _$timeout_, _$rootScope_, _$httpBackend_, _$templateCache_) {
      $compile = _$compile_;
      $timeout = _$timeout_;
      $rootScope = _$rootScope_;
      $httpBackend = _$httpBackend_;
      $templateCache = _$templateCache_;
    });

    element = $compile('<clock-register></clock-register>')($rootScope);
    $rootScope.$digest();
  });

  it('should exist', function () {
    expect(element.html()).toBeDefined();
  });

  describe('hitting the point', function () {
    beforeEach(function () {
      hitThePointBtn = element.find('#hitThePointBtn');
    });

    it('should exist a button', function () {
      expect(hitThePointBtn[0]).toBeDefined();
    });

    describe('given user is starting the day', function () {
      it('should show empty list', function () {
        var list = element.find('#daily-list');
        expect(list[0]).toBeDefined();
      });

      describe('after clicking the button', function () {
        it('in case of success, should show the time in the list', function () {
          var firstItem;

          $httpBackend.expect('POST', '/api/v1/clock/hit').respond(200, {time: '16:20:00'});
          hitThePointBtn.click();
          $httpBackend.flush();

          firstItem = element.find('#daily-list :eq(0)');

          expect(firstItem.text()).toBe('16:20:00');
        });

        it('if session is lost, should warn the user with message', function (done) {
          var feedbackMessage;

          spyOn(window, 'alert');

          $httpBackend.expect('POST', '/api/v1/clock/hit').respond(401, {message: 'Ocorreu algum erro desconhecido no servidor.'});
          hitThePointBtn.click();
          $httpBackend.flush();

          expect(window.alert).toHaveBeenCalledWith('Ocorreu algum erro desconhecido no servidor.');

          // feedbackMessage = element.find('#feedback-message');
          //
          // expect(feedbackMessage).toBeDefined();
          // expect(feedbackMessage.text()).toBe('Ocorreu algum erro desconhecido no servidor.');
          // expect(feedbackMessage.hasClass('error')).toBe(true);
        });

        it('if "RondaWeb" is down, should tell it to the user', function () {
          var feedbackMessage;

          $httpBackend.expect('POST', '/api/v1/clock/hit').respond(500, {message: 'RondaWeb tá fora!'});
          hitThePointBtn.click();
          $httpBackend.flush();

          feedbackMessage = element.find('#feedback-message');
          expect(feedbackMessage).toBeDefined();
          expect(feedbackMessage.text()).toBe('RondaWeb tá fora!');
          expect(feedbackMessage.hasClass('error')).toBe(true);
        });
      });

      describe('multiple clicks', function () {
        beforeEach(function () {
          $httpBackend.when('POST', '/api/v1/clock/hit').respond(200, {time: '16:20:00'});

          hitThePointBtn.click();
          $httpBackend.flush();

          hitThePointBtn.click();
          $httpBackend.flush();
        });

        it('should ignore multiple clicks at the same second', function () {
          var feedbackMessage = element.find('#feedback-message');

          expect(feedbackMessage).toBeDefined();
          expect(feedbackMessage.text()).toBe('Você é um banana!');
          expect(feedbackMessage.hasClass('error')).toBe(true);
        });

        it('should remove the warning message after 10s', function () {
          var feedbackMessage = element.find('#feedback-message');
          expect(feedbackMessage.text()).toBe('Você é um banana!');

          // triggers all $timeout function calls
          $timeout.flush()

          feedbackMessage = element.find('#feedback-message');
          expect(feedbackMessage[0]).toBeUndefined();
        });
      });
    });

    xit('should handle "corujão" situations', function () {
    });

    xit('should use browser native notification', function () {
    });
  });
});
