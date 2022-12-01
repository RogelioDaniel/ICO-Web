

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
      Timer.interval = setInterval(Timer.count, 500);
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