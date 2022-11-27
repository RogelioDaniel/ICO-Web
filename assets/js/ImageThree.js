/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

$(document).ready(function () {
    var input = $('.field').find('input, textarea');
    input.keyup(function () {
      inputTest(this);
    });
  });
  
  function inputTest(that) {
    var field = $(that).closest('.field');
    var form = $(that).closest('form, .form');
    var length = $.trim($(that).val()).length;
  
    //  FILLED
    if (length > 0) field.addClass('filled');else field.removeClass('filled');
  
    //  VALIDATED
    if (length >= 4) {
      field.addClass('validated');
      form.addClass('validated');
    } else {
      field.removeClass('validated');
      form.removeClass('validated');
    }
  }
  var Timer = {
    length: null,
    time: null,
    selector: null,
    interval: null,
    callback: null,
  
    //  RUN
    run: function (selector, callback, length) {
      Timer.length = length;
      Timer.time = Timer.length;
      Timer.selector = selector;
      Timer.callback = callback;
      $(Timer.selector).text(Timer.length);
      Timer.interval = setInterval(Timer.count, 1000);
    },
  
    //  COUNT
    count: function () {
      Timer.time = Timer.time - 1;
      $(Timer.selector).text(Timer.time);
      if (Timer.time <= 0) {
        if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
        Timer.reset();
      }
    },
  
    //  RESET
    reset: function () {
      clearInterval(Timer.interval);
      Timer.length = null;
      Timer.time = null;
      Timer.selector = null;
      Timer.interval = null;
      Timer.callback = null;
    }
  };
  var Identity = {
    duration: 1400,
    delay: 1000,
    iteration: 0,
    processing: false,
    enough: false,
    interval: null,
    callback: null,
    status: 'loading',
    id: '#identity',
    selector: '#identity div',
    classes: 'working rest robot',
  
    //  WORK
    work: function () {
      if (Identity.status != 'loading') Identity.status = 'working';
      Identity.wait(function () {
        $(Identity.id).addClass('working');
      });
    },
  
    //  ROBOT
    robot: function () {
      Identity.status = 'robot';
      Identity.wait(function () {
        $(Identity.id).addClass('robot');
      });
    },
  
    //  REST
    rest: function () {
      Identity.abort();
      Identity.status = 'rest';
      setTimeout(function () {
        Identity.abort();
        $(Identity.id).addClass('rest');
      }, Identity.delay);
    },
  
    //  WAIT
    wait: function (call) {
      if (Identity.processing != true) {
        Identity.abort();
        Identity.processing = true;
  
        setTimeout(function () {
          if (typeof call === 'function' && call) call();
          Identity.waiting();
          Identity.interval = setInterval(Identity.waiting, Identity.duration);
        }, Identity.delay);
      }
    },
  
    //  WAITING
    waiting: function () {
      if (Identity.enough != true) {
        ++Identity.iteration;
        return;
      }
  
      Identity.stopping();
    },
  
    //  STOP
    stop: function (callback) {
      setTimeout(function () {
        if (Identity.processing == true) {
          Identity.enough = true;
          Identity.callback = callback;
  
          $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
        }
      }, Identity.delay);
    },
  
    //  STOPPING
    stopping: function () {
      clearInterval(Identity.interval);
      Identity.rest();
  
      if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
      Identity.reset();
    },
  
    //  ABORT
    abort: function () {
      if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
    },
  
    //  RESET
    reset: function () {
      Identity.iteration = 0;
      Identity.processing = false;
      Identity.enough = false;
      Identity.interval = null;
      Identity.callback = null;
  
      $(Identity.selector).removeAttr('style');
    }
  };
  var Stars = {
    canvas: null,
    context: null,
    circleArray: [],
    colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],
  
    mouseDistance: 50,
    radius: .5,
    maxRadius: 1.5,
  
    //  MOUSE
    mouse: {
      x: undefined,
      y: undefined,
      down: false,
      move: false
    },
  
    //  INIT
    init: function () {
      this.canvas = document.getElementById('stars');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.display = 'block';
      this.context = this.canvas.getContext('2d');
  
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener('resize', this.resize);
  
      this.prepare();
      this.animate();
    },
  
    //  CIRCLE
    Circle: function (x, y, dx, dy, radius, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = this.radius;
  
      this.draw = function () {
        Stars.context.beginPath();
        Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        Stars.context.fillStyle = fill;
        Stars.context.fill();
      };
  
      this.update = function () {
        if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
  
        this.x += this.dx;
        this.y += this.dy;
  
        //  INTERACTIVITY
        if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
          if (this.radius < Stars.maxRadius) this.radius += 1;
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
  
        this.draw();
      };
    },
  
    //  PREPARE
    prepare: function () {
      this.circleArray = [];
  
      for (var i = 0; i < 1200; i++) {
        var radius = Stars.radius;
        var x = Math.random() * (this.canvas.width - radius * 2) + radius;
        var y = Math.random() * (this.canvas.height - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1.5;
        var dy = (Math.random() - 1) * 1.5;
        var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
  
        this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
      }
    },
  
    //  ANIMATE
    animate: function () {
      requestAnimationFrame(Stars.animate);
      Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);
  
      for (var i = 0; i < Stars.circleArray.length; i++) {
        var circle = Stars.circleArray[i];
        circle.update();
      }
    },
  
    //  MOUSE MOVE
    mouseMove: function (event) {
      Stars.mouse.x = event.x;
      Stars.mouse.y = event.y;
    },
  
    //  RESIZE
    resize: function () {
      Stars.canvas.width = window.innerWidth;
      Stars.canvas.height = window.innerHeight;
    }
  };
  var renderer, scene, camera, ww, wh, particles;
  
  ww = window.innerWidth, wh = window.innerHeight;
  
  var centerVector = new THREE.Vector3(0, 0, 0);
  var previousTime = 0;
  speed = 10;
  isMouseDown = false;
  
  var getImageData = function (image) {
  
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
  
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
  
      return ctx.getImageData(0, 0, image.width, image.height);
  };
  
  function getPixel(imagedata, x, y) {
      var position = (x + imagedata.width * y) * 4,
          data = imagedata.data;
      return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
  }
  
  var drawTheMap = function () {
  
      var geometry = new THREE.Geometry();
      var material = new THREE.PointCloudMaterial();
      material.vertexColors = true;
      material.transparent = true;
      for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
          for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
              if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {
  
                  var vertex = new THREE.Vector3();
                  vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
                  vertex.y = -y + imagedata.height / 2;
                  vertex.z = -Math.random() * 500;
  
                  vertex.speed = Math.random() / speed + 0.015;
  
                  var pixelColor = getPixel(imagedata, x, y);
                  var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
                  geometry.colors.push(new THREE.Color(color));
                  geometry.vertices.push(vertex);
              }
          }
      }
      particles = new THREE.Points(geometry, material);
  
      scene.add(particles);
  
      requestAnimationFrame(render);
  };
  
  var init = function () {
      renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById("yahia"),
          antialias: true,
          alpha: true
      });
      renderer.setSize(ww, wh);
  
      scene = new THREE.Scene();
  
      camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
      camera.position.set(0, -20, 4);
      camera.lookAt(centerVector);
      scene.add(camera);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
  
      imagedata = getImageData(image);
      drawTheMap();
  
      window.addEventListener('mousemove', onMousemove, false);
      window.addEventListener('mousedown', onMousedown, false);
      window.addEventListener('mouseup', onMouseup, false);
      window.addEventListener('resize', onResize, false);
  };
  var onResize = function () {
      ww = window.innerWidth;
      wh = window.innerHeight;
      renderer.setSize(ww, wh);
      camera.left = ww / -2;
      camera.right = ww / 2;
      camera.top = wh / 2;
      camera.bottom = wh / -2;
      camera.updateProjectionMatrix();
  };
  
  var onMouseup = function () {
      isMouseDown = false;
  };
  var onMousedown = function (e) {
      isMouseDown = true;
      lastMousePos = { x: e.clientX, y: e.clientY };
  };
  var onMousemove = function (e) {
      if (isMouseDown) {
          camera.position.x += (e.clientX - lastMousePos.x) / 100;
          camera.position.y -= (e.clientY - lastMousePos.y) / 100;
          camera.lookAt(centerVector);
          lastMousePos = { x: e.clientX, y: e.clientY };
      }
  };
  
  var render = function (a) {
  
      requestAnimationFrame(render);
  
      particles.geometry.verticesNeedUpdate = true;
      if (!isMouseDown) {
          camera.position.x += (0 - camera.position.x) * 0.06;
          camera.position.y += (0 - camera.position.y) * 0.06;
          camera.lookAt(centerVector);
      }
  
      renderer.render(scene, camera);
  };
  
  var imgData = 'data:image/jpeg;base64,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';
  
  var image = document.createElement("img");
  image.src = imgData;
  var Submit = {
  
    //  DATA
    data: function (template, fields) {
      var data = {};
      for (i = 0; i < fields.length; i++) {
        var field = $(fields[i]);
        var name = field.attr('name');
        var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
        data[name] = value;
      }
  
      return data;
    },
  
    //  PUSH
    push: function (form) {
      var template = $('.template[data-template=' + form + ']');
      var fields = template.find('.field input, .field textarea');
  
      //  WAITING
      Submit.view('[data-status=waiting]', template);
  
      //  AJAX
      $.ajax({
        type: 'POST',
        url: 'includes/php/' + form + '.php',
        data: { dd: JSON.stringify(Submit.data(template, fields)) },
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          Submit.callback('error', form, template, fields);
        },
        success: function (data) {
          Submit.callback('success', form, template, fields);
        }
      });
    },
  
    //  CALLBACK
    callback: function (status, form, template, fields) {
      setTimeout(function () {
  
        //  SUCCESS
        if (status == 'success') {
          template.find('.form .status').removeClass('current');
          fields.closest('.field').fadeOut(700);
          fields.closest('.form').find('.submit').fadeOut(700);
          Identity.stop();
  
          if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;
  
          setTimeout(function () {
            fields.closest('.form').find('.submit').remove();
            fields.closest('.field').remove();
            template.find('.form .status[data-status=success]').addClass('current');
          }, 750);
        }
  
        //  ERROR
        else {
            Submit.view('[data-status=error]', template);
            setTimeout(function () {
              Submit.view(':not([data-status])', template);
            }, 6000);
          }
      }, 4000);
    },
  
    //	VIEW
    view: function (selector, template) {
      template.find('.form .status').removeClass('current');
      template.find('.form .status' + selector).addClass('current');
    },
  
    //	LISTEN
    listen: function (selector) {
      $(selector).on('click', function (e) {
        if ($(this).closest('.form').hasClass('validated')) {
          var form = $(this).attr('data-form');
          Submit.push(form);
        }
  
        e.preventDefault();
      });
    }
  };
  var Router = {
      wrapper: [],
      location: null,
  
      //	ROUTE
      route: function (location, callback) {
          Identity.work();
          Router.location = Router.processLocation(location);
  
          //	ROUTES
          Router.routes(callback);
      },
  
      //	PROCESS LOCATION
      processLocation: function (location) {
          if (location === undefined) location = window.location.hash;
  
          return location.replace('#', '');
      },
  
      //	CALLBACK
      callback: function (callback) {
          setTimeout(function () {
              Identity.stop();
        Router.updateWrapper();
        Router.updateTemplate(Router.wrapper[0]);
        window.location.hash = Router.location;
        Router.location = null;
  
        //  CALLBACKS
        Router.callbacks(Router.wrapper[0]);
        if (typeof callback === 'function' && callback) callback();
          }, 200);
      },
  
      //	UPDATE TEMPLATE
      updateTemplate: function (template) {
          var templates = $('.template');
          var current = $('.template[data-template=' + template + ']');
  
          templates.removeClass('current');
          setTimeout(function () {
              templates.hide();
              current.show().addClass('current');
          }, 1120);
      },
  
      //	UPDATE WRAPPER
      updateWrapper: function (push, pull) {
          if (push) Router.push(push);
          if (pull) Router.pull(pull);
  
          var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
          $('.wrapper').attr('class', 'wrapper ' + wrapper);
      },
  
      //	PUSH
      push: function (items) {
          items = items.split(' ');
  
          for (i = 0; i < items.length; i++) {
              if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
          }
      },
  
      //	PULL
      pull: function (items) {
          items = items.split(' ');
  
          for (i = 0; i < items.length; i++) {
              if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
          }
      },
  
      //	LISTEN
      listen: function () {
          $('.wrapper').on('click', '.router', function (e) {
              Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
              e.preventDefault();
          });
  
          window.addEventListener('popstate', function (e) {
              Router.route(undefined);
          });
      }
  };
  Router.routes = function (callback) {
    Router.wrapper = [];
    var location = Router.location.split('/').filter(Boolean);
  
    //  HOME
    Router.push('home');
  
    //  CALLBACK
    Router.callback(callback);
  };
  Router.callbacks = function (wrapper) {
    if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
  };
  var secretAvailability = true;
  function secret() {
    if (secretAvailability == true) {
      setTimeout(function () {
        var input = $('.template[data-template=secret] .field').find('input, textarea');
  
        input.focus();
        Identity.robot();
      }, Identity.duration * 1.25);
    }
  }
  var opinionAvailability = true;
  function opinion() {
    if (opinionAvailability == true) {
      setTimeout(function () {
        var input = $('.template[data-template=opinion] .field').find('input, textarea');
  
        input.focus();
        Identity.robot();
      }, Identity.duration * 1.25);
    }
  }
  function bucketAll() {
    var list = $('.template[data-template=bucketAll] .bucketList');
    var link = list.find('li.archived a');
  
    //  LISTEN
    link.hover(function () {
      list.addClass('hover');
    }, function () {
      list.removeClass('hover');
    });
  }
  function notFound() {
    setTimeout(function () {
      Timer.run('.template[data-template=notFound] time', function () {
        Router.route('#');
      }, 5);
    }, Identity.duration * 1.25);
  }
  
  function notFoundCallback() {
    Timer.reset();
  }
  var md = new MobileDetect(window.navigator.userAgent);
  
  $(document).ready(function () {
    Identity.work();
    $('.template main').mCustomScrollbar({
      theme: 'dark'
    });
  });
  
  function loadProject() {
    Router.route(undefined, function () {
  
      //  CALLBACK
      Router.listen();
      Submit.listen('.submit');
      if (!md.mobile()) {
        Stars.init();
        init();
      }
      setTimeout(function () {
        $('#signature').removeClass('loading');
      }, Identity.delay * 1.5);
    });
  };
  
  loadProject();