describe('dojo clock register controller', function () {
  var clockRegisterController;
  var $httpBackend;
  var $scope = {};

  beforeEach(function () {
    module('dojo');

    inject(function ($controller, $injector) {
      $scope = {};
      $httpBackend = $injector.get('$httpBackend');
      clockRegisterController = $controller('clockRegister', {$scope: $scope});
    });
  });

  it('should exist', function () {
    expect(clockRegisterController).toBeDefined();
  });

  describe('hitting the point', function () {
    describe('when user click on clock register button', function () {
      beforeEach(function () {
        $httpBackend.when('POST', '/api/v1/clock/hit').respond(200, {});
        $scope.hitThePoint();
      });

      it('should save a new hit at clock API', function () {
        $httpBackend.expect('POST', '/api/v1/clock/hit');
        $httpBackend.flush();
      });

      it('should show success message', function () {
        $httpBackend.flush();
        expect($scope.message.text).toEqual('Você bateu o ponto com sucesso!');
        expect($scope.message.type).toEqual('success');
      });
    });

    describe('server errors', function () {
      it('response auth error', function () {
        $httpBackend.when('POST', '/api/v1/clock/hit').respond(401, {message: 'Houve algum problema na autenticação do seus dados.'});
        $scope.hitThePoint();
        $httpBackend.flush();
        expect($scope.message.text).toEqual('Houve algum problema na autenticação do seus dados.');
        expect($scope.message.type).toEqual('error');
      });

      it('server offline', function () {
        $httpBackend.when('POST', '/api/v1/clock/hit').respond(404, {});
        $scope.hitThePoint();
        $httpBackend.flush();
        expect($scope.message.text).toEqual('Servidor offline.');
        expect($scope.message.type).toEqual('error');
      });

      it('response error', function () {
        $httpBackend.when('POST', '/api/v1/clock/hit').respond(500, {});
        $scope.hitThePoint();
        $httpBackend.flush();
        expect($scope.message.text).toEqual('Ocorreu algum erro desconhecido no servidor.');
        expect($scope.message.type).toEqual('error');
      });
    });
  });
});
