var registerSIP = function() {
  var server = document.querySelector('#server').value,
      username = document.querySelector('#username').value,
      password = document.querySelector('#password').value,
      extension = document.querySelector('#extension').value;

  var configuration = {
    register: true,
    registerExpires: 90,
    registrarServer: 'sip:'+server,
    stunServers: [
      "stun:stun4.l.google.com:19302",
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302",
      "stun:stun3.l.google.com:19302",
      "stun:stun.ekiga.net",
      "stun:stun.ideasip.com",
      "stun:stun.rixtelecom.se",
      "stun:stun.schlund.de",
      "stun:stun.stunprotocol.org:3478",
      "stun:stun.voiparound.com",
      "stun:stun.voipbuster.com",
      "stun:stun.voipstunt.com",
      "stun:stun.voxgratia.org"
    ],
    wsServers: 'ws://'+server+':8088/ws',
    uri: 'sip:'+username+'@'+server,
    authorizationUser: username,
    password: password,
    displayName: username,
    hackIpInContact: true,
    traceSip: true
  },
  options = {
    media: {
      constraints: {
        audio: true,
        video: true
      },
      render: {
        remote: { video: document.getElementById('remote') },
        local: { video: document.getElementById('local') }
      }
    }
  };

  var session, ua, target;

  target = 'sip:'+extension+'@'+server;

  ua = new SIP.UA(configuration);
  ua.on('invite', function(incomingCall) {
    incomingCall.accept(options);
  });

  document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();

    session = ua.invite(target, options);
    session.on('bye', function() {
      session = null;
    });
  });
}

var app = angular.module('nw-demo', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller: 'VideosController',
    templateUrl: '_videos.html'
  });
});

app.controller('VideosController', function($scope) {
  registerSIP();
});
