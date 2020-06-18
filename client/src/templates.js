angular.module('dojo.templates', [])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('src/authentication/authentication-form.html',
    '<div id="auth-form">\n' +
    '  <input id="login" type="text" placeholder="login" ng-model="user.login">\n' +
    '  <input id="password" type="password" placeholder="senha" ng-model="user.password">\n' +
    '  <button id="authConfirm" ng-click="hitThePoint()">Bater o ponto</button>\n' +
    '  <p class="message">{{message}}</p>\n' +
    '</div>\n' +
    '')
  $templateCache.put('src/clock-register/clock-register.html',
    '<div>\n' +
    '  <svg id="hitThePointBtn" ng-click="hitThePoint()" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 64 64" width="24px">\n' +
    '    <path fill="#006DAE" d="M62 50c0 6.6-5.4 12-12 12H14C7.4 62 2 56.6 2 50V14C2 7.398 7.4 2 14 2h36c6.6 0 12 5.398 12 12v36z" />\n' +
    '    <path fill="#014D87" d="M56.838 4.162A11.893 11.893 0 0 1 59 11v37c0 6.6-4.398 11-11 11H11c-2.537 0-4.895-.805-6.838-2.162C6.336 59.949 9.938 62 14 62h36c6.602 0 12-5.4 12-12V14c0-4.062-2.049-7.664-5.162-9.838z" />\n' +
    '    <path fill-rule="evenodd" clip-rule="evenodd" fill="#0FB4D4" d="M4.975 12.584c.338 2.703 4.793-2.586 9.303-7.135 2.91-2.926-10.321-1-9.303 7.135z" />\n' +
    '    <path fill="#FFF" d="M49.368 28l1.635-6h-6.104l1.635-6h-6.102l-1.637 6h-8.137l1.635-6h-6.102l-1.637 6h-6.102l-1.635 6h6.102l-2.18 8h-6.104L13 42h6.104l-1.637 6h6.104l1.635-6h8.139l-1.637 6h6.104l1.635-6h6.104l1.635-6h-6.102l2.18-8h6.104zm-14.387 8h-8.137l2.18-8h8.137l-2.18 8z" />\n' +
    '  </svg>\n' +
    '\n' +
    '  <p ng-if="message.text" class="{{message.type}}" id="feedback-message">{{message.text}}</p>\n' +
    '\n' +
    '  <ul id="daily-list">\n' +
    '    <li ng-repeat="mark in markings track by $index">{{ mark }}</li>\n' +
    '  </ul>\n' +
    '\n' +
    '  <span>Horas trabalhadas: <strong>+ {{ day.workedHours }}</strong></span>\n' +
    '  <span>Saldo do dia: <strong>+ {{ day.balanceHours }}</strong></span>\n' +
    '</div>\n' +
    '')

  }]);
