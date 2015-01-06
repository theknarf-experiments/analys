(function() {
	window.onload = function() {

		var c=document.getElementById("myCanvas");
		var cxt=c.getContext("2d");

		var camera = {	x: 0, y: 0 };

		var walls = [{"x":50,"y":30},{"x":50,"y":31},{"x":50,"y":32},{"x":50,"y":33},{"x":50,"y":34},{"x":50,"y":35},{"x":50,"y":36},{"x":50,"y":37},{"x":50,"y":38},{"x":50,"y":39},{"x":50,"y":40},{"x":50,"y":42},{"x":50,"y":43},{"x":50,"y":44},{"x":50,"y":45},{"x":50,"y":46},{"x":50,"y":47},{"x":50,"y":48},{"x":50,"y":50},{"x":50,"y":49},{"x":50,"y":51},{"x":51,"y":51},{"x":52,"y":51},{"x":52,"y":51},{"x":53,"y":51},{"x":54,"y":51},{"x":55,"y":51},{"x":56,"y":51},{"x":57,"y":51},{"x":58,"y":51},{"x":51,"y":30},{"x":52,"y":30},{"x":53,"y":30},{"x":54,"y":30},{"x":55,"y":30},{"x":56,"y":30},{"x":57,"y":30},{"x":58,"y":30},{"x":60,"y":30},{"x":60,"y":51},{"x":61,"y":51},{"x":62,"y":51},{"x":63,"y":51},{"x":64,"y":51},{"x":65,"y":51},{"x":66,"y":51},{"x":66,"y":50},{"x":66,"y":49},{"x":66,"y":48},{"x":66,"y":47},{"x":66,"y":46},{"x":66,"y":45},{"x":66,"y":44},{"x":66,"y":43},{"x":61,"y":30},{"x":62,"y":30},{"x":63,"y":30},{"x":64,"y":30},{"x":65,"y":30},{"x":66,"y":30},{"x":66,"y":31},{"x":66,"y":32},{"x":66,"y":33},{"x":66,"y":34},{"x":66,"y":40},{"x":66,"y":39},{"x":66,"y":38},{"x":66,"y":37},{"x":66,"y":36},{"x":66,"y":35},{"x":66,"y":42}];

		var walls_prop = { width: 10, height: 10 };
		var mouse = { lastpos: {
			x: 0,
			y: 0
		}};

		var drawingmode = 0; // 0: walls, 1: people

		function exportWalls() {
			return JSON.stringify(walls);
		}

		function toWallCoord(pos) {
			with(walls_prop) with(pos) {
				return {
					x: (x - x%width)/width,
					y: (y - y%height)/height
				};
			}
		}

		// Draw loop
		(function() {
			function clear() {
				cxt.canvas.width  = window.innerWidth;
				cxt.canvas.height = window.innerHeight;
			}

			function rect(itm) {
				cxt.fillRect(itm.x * walls_prop.width, itm.y * walls_prop.height, walls_prop.width, walls_prop.height);
			}

			clear();

			// Draw walls
			walls.forEach(function(itm) {
				cxt.fillStyle = "white";
				rect(itm);
			});

			// Draw rectangle mouse is over
			var mouse_over = toWallCoord(mouse.lastpos);
			cxt.fillStyle = "grey";
			rect(mouse_over);

			// Drawingmode
			cxt.font = "40px FontAwesome";
			cxt.fillStyle = "white";
			cxt.fillText(
				drawingmode == 0 ? "\uf204" : "\uf205",
				window.innerWidth - 100,
				50
			);

			// Continue loop
			requestAnimationFrame(arguments.callee);
		})();

		// Game loop
		setInterval(function() {
			
		}, 33); // ca 30 fps

		// Save last mouse position
		c.addEventListener('mousemove', function(e) {
			mouse.lastpos = {
				x: e.pageX,
				y: e.pageY
			}
		});

		// Add wall to walls array where you click
		c.addEventListener('mouseup', function(e) {
			if (event.which == 1) {  // Left click
			
				if(drawingmode == 0)
					walls.push(toWallCoord({
						x: e.pageX,
						y: e.pageY
					}));

			}
		});

		c.addEventListener('contextmenu', function(e) {
			drawingmode = !drawingmode;

			e.preventDefault();
			return 0;
		});

	};
})();