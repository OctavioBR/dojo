(function () {
  'use strict';

  angular
    .module('dojo')
    .controller('clockRegister', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
      $scope.markings = [];

      function setMessage(text, type) {
        $scope.message = {
          text: text,
          type: type
        };

        $timeout(function clearMessage() {
          $scope.message.text = "";
        }, 10000);
      }

      $scope.hitThePoint = function hitThePoint() {
        $http
          .post('/api/v1/clock/hit', $scope.user)
          .then(function (res) {
            if ($scope.markings.indexOf(res.data.time) > -1) {
              setMessage('Você é um banana!', 'error');
            } else {
              setMessage('Você bateu o ponto com sucesso!', 'success');
              $scope.markings.push(res.data.time);
            }
          }).catch(function (res) {
            // TODO remover esse if e colocar a lógica dentro dos cases com operador ||
            if (res.data.message) {
              setMessage(res.data.message, 'error');
              return;
            }

            switch (res.status) {
              // TODO fazer funcionar com o alert
              case 401: {
                setMessage('Houve algum problema na autenticação do seus dados.', 'error');
                break;
              }

              case 404: {
                setMessage('Servidor offline.', 'error');
                break;
              }

              case 500: {
                setMessage('Ocorreu algum erro desconhecido no servidor.', 'error');
                break;
              }

              default: {
                setMessage('Aconteceu algum erro com o servidor :(', 'error');
              }
            }
          });
      };
    }]);
})();
